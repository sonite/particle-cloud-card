/**
 * Particle Cloud Card for Home Assistant
 *
 * Ambient, theme-aware particle visualization for numeric entities.
 * - Swarm (boids) motion + optional mist/cloud density layer
 * - DPR-correct canvas scaling (no cumulative scaling)
 * - Container ResizeObserver (responsive)
 * - Pixel-coordinate particles (consistent physics)
 *
 * Release: v0.1.0
 */
import { LitElement, html, css } from "lit";
// import { LitElement, html, css } from "https://unpkg.com/lit@2.8.0/index.js?module"; // For Local builds

class ParticleCloudCard extends LitElement {
  static get properties() {
    return {
      _hass: { type: Object },
      _config: { type: Object },
    };
  }

  constructor() {
    super();
    this.particles = [];
    this.animationFrame = null;
    this.lastDrawTime = 0;
    this.noiseTime = 0;

    this._initialized = false;
    this._targets = { speed: 0, color: 0, size: 0 };
    this._currents = { speed: 0, color: 0, size: 0 };
    this._lerpFactor = 0.06;

    this.width = 0;
    this.height = 0;
    this._dpr = 1;

    this._theme = {
      text: "rgba(255,255,255,0.9)",
      bg: "rgb(0,0,0)",
      card: "rgba(0,0,0,0)",
      isDark: true,
    };
    this._lastThemeCheck = 0;

    // Mist
    this._mistRatio = 0.33;
    this._mistCanvas = null;
    this._mistCtx = null;

    // Resize observer handle
    this._resizeObserver = null;

    // Canvas handles
    this.canvas = null;
    this.ctx = null;
  }

  // ------------------------------
  // Home Assistant integration
  // ------------------------------

  setConfig(config) {
    if (!config || (!config.entity && !config.entity_speed && !config.entity_color && !config.entity_size)) {
      throw new Error(
        "Define at least one entity (entity, entity_speed, entity_color, entity_size)."
      );
    }

    this._config = {
      // Normalization defaults
      min: 0,
      max: 1,

      // Performance defaults (boids are O(N^2))
      fps: 24,
      particle_count: 220,

      // Visual toggles
      mist: true,
      debug: false,

      // Palette
      palette: [
        [0, "#00ff00"],
        [0.5, "#ffff00"],
        [1, "#ff0000"],
      ],

      ...config,
    };

    ["speed", "color", "size"].forEach((r) => {
      if (this._config[`${r}_min`] === undefined) this._config[`${r}_min`] = this._config.min;
      if (this._config[`${r}_max`] === undefined) this._config[`${r}_max`] = this._config.max;
    });
  }

  set hass(hass) {
    const old = this._hass;
    this._hass = hass;

    if (this._initialized) this._updateTargets();

    this.requestUpdate("_hass", old); // ensures header refresh
  }

  // Helps HA layout estimate the card height
  getCardSize() {
    return 3;
  }

  // Card picker / UI editor stub
  static getStubConfig() {
    return {
      type: "custom:particle-cloud-card",
      entity: "sensor.energy_power",
      min: 0,
      max: 10000,
      particle_count: 180,
      fps: 24,
      mist: true,
    };
  }

  // ------------------------------
  // Lifecycle
  // ------------------------------

  connectedCallback() {
    super.connectedCallback();
    this._initialized = true;

    this.updateComplete.then(() => {
      this._setupCanvas();
      this._setupMistCanvas();
      this._updateTheme();
      this._handleResize(); // ensures width/height exist
      this._initParticles();
      if (this._hass) this._updateTargets();
      this._startAnimation();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;

    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  // ------------------------------
  // Setup / resize
  // ------------------------------

  _setupCanvas() {
    const canvas = this.shadowRoot?.querySelector("canvas");
    if (!canvas) return;

    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });

    const container = this.shadowRoot?.querySelector(".container");
    if (!container) return;

    // Only create once
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(() => this._handleResize());
      this._resizeObserver.observe(container);
    }
  }

  _handleResize() {
    if (!this.canvas || !this.ctx) return;

    const container = this.shadowRoot?.querySelector(".container");
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);

    const prevW = this.width;
    const prevH = this.height;

    const dpr = window.devicePixelRatio || 1;
    this._dpr = dpr;

    // CSS size
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;

    // Backing store
    this.canvas.width = Math.floor(w * dpr);
    this.canvas.height = Math.floor(h * dpr);

    // Reset transform BEFORE scaling (prevents cumulative scaling)
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);

    this.width = w;
    this.height = h;

    this._resizeMistCanvas();

    // Re-init particles on meaningful resize to avoid odd “offscreen” clumps.
    if (this._config && (Math.abs(w - prevW) > 40 || Math.abs(h - prevH) > 40)) {
      this._initParticles();
    }
  }

  // ------------------------------
  // Particles
  // ------------------------------

  _initParticles() {
    const { width, height } = this;
    const cx = width / 2;
    const cy = height / 2;

    this.particles = [];
    const count = Math.max(1, this._config?.particle_count || 200);

    for (let i = 0; i < count; i++) {
      const x = cx + (Math.random() - 0.5) * width * 0.6;
      const y = cy + (Math.random() - 0.5) * height * 0.6;

      // random velocity
      const a = Math.random() * Math.PI * 2;
      const s = 0.6 + Math.random() * 0.8;

      this.particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        size: Math.random() * 2.5 + 1.5,
        phase: Math.random() * Math.PI * 2, // for subtle wiggle
      });
    }
  }

  _updateTargets() {
    if (!this._hass || !this._config) return;

    // Log-ish normalization that works well for power-like signals:
    //  - preserves low-end detail
    //  - compresses high spikes
    const logNorm = (x, min, max) => {
      const mnRaw = Number(min);
      const mn = Number.isFinite(mnRaw) && mnRaw > 0 ? mnRaw : 1e-3;
      const mx = Math.max(mn + 1e-6, Number(max));
      const xv = Number.isFinite(x) ? x : 0;
      const xc = Math.max(0, Math.min(xv, mx));

      const denom = Math.log1p(mx / mn);
      if (!Number.isFinite(denom) || denom === 0) return 0;

      const n = Math.log1p(xc / mn) / denom;
      return Math.max(0, Math.min(1, n));
    };

    ["speed", "color", "size"].forEach((feature) => {
      const entityId = this._config[`entity_${feature}`] || this._config.entity;
      const st = entityId ? this._hass.states[entityId] : null;
      if (!st) return;

      const val = parseFloat(st.state);
      if (!Number.isFinite(val)) return;

      const min = this._config[`${feature}_min`];
      const max = this._config[`${feature}_max`];

      this._targets[feature] = logNorm(val, min, max);
    });
  }

  // ------------------------------
  // Helpers
  // ------------------------------

  _ensureRgb(color) {
    if (!color) return "rgb(255, 255, 255)";
    if (typeof color !== "string") return "rgb(255, 255, 255)";
    if (color.startsWith("rgb")) return color;

    let hex = color.replace("#", "").trim();
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return `rgb(${r}, ${g}, ${b})`;
  }

  _interpolateColor(t) {
    const raw = Array.isArray(this._config?.palette) ? this._config.palette : [];
    const palette = [...raw]
      .map((item) => (Array.isArray(item) ? { stop: item[0], color: item[1] } : item))
      .filter((p) => p && Number.isFinite(p.stop) && typeof p.color === "string")
      .sort((a, b) => a.stop - b.stop);

    if (!palette.length) return "rgb(255, 255, 255)";

    const first = palette[0];
    const last = palette[palette.length - 1];
    if (t <= first.stop) return this._ensureRgb(first.color);
    if (t >= last.stop) return this._ensureRgb(last.color);

    for (let i = 0; i < palette.length - 1; i++) {
      const s = palette[i], e = palette[i + 1];
      if (t >= s.stop && t <= e.stop) {
        const localT = (t - s.stop) / (e.stop - s.stop || 1);

        const m1 = this._ensureRgb(s.color).match(/\d+/g);
        const m2 = this._ensureRgb(e.color).match(/\d+/g);
        if (!m1 || !m2 || m1.length < 3 || m2.length < 3) return "rgb(255,255,255)";

        const c1 = m1.slice(0, 3).map(Number);
        const c2 = m2.slice(0, 3).map(Number);

        const r = Math.round(c1[0] + localT * (c2[0] - c1[0]));
        const g = Math.round(c1[1] + localT * (c2[1] - c1[1]));
        const b = Math.round(c1[2] + localT * (c2[2] - c1[2]));
        return `rgb(${r}, ${g}, ${b})`;
      }
    }
    return this._ensureRgb(first.color);
  }

  _noise(x, y, t) {
    return (
      Math.sin(x * 1.5 + t) * Math.cos(y * 1.2 - t * 0.8) +
      Math.sin(y * 2.1 + t * 0.5) * 0.5
    );
  }

  _cssVar(name, fallback = "") {
    const v = getComputedStyle(this).getPropertyValue(name);
    return (v && v.trim()) ? v.trim() : fallback;
  }

  _parseRgb(str) {
    if (!str || typeof str !== "string") return null;
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3] };
  }

  _luminance({ r, g, b }) {
    const srgb = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }

  _updateTheme() {
    const primaryText = this._cssVar("--primary-text-color", "rgb(255,255,255)");
    const primaryBg = this._cssVar("--primary-background-color", "rgb(0,0,0)");
    const cardBg = this._cssVar("--card-background-color", "rgba(0,0,0,0)");

    const bgRgb = this._parseRgb(primaryBg) || { r: 0, g: 0, b: 0 };
    const isDark = this._luminance(bgRgb) < 0.35;

    this._theme = {
      text: primaryText,
      bg: primaryBg,
      card: cardBg,
      isDark,
    };
  }

  // ------------------------------
  // Mist layer
  // ------------------------------

  _setupMistCanvas() {
    this._mistCanvas = document.createElement("canvas");
    this._mistCtx = this._mistCanvas.getContext("2d");
    this._resizeMistCanvas();
  }

  _resizeMistCanvas() {
    if (!this._mistCanvas) return;
    const w = Math.max(1, Math.floor(this.width * this._mistRatio));
    const h = Math.max(1, Math.floor(this.height * this._mistRatio));
    this._mistCanvas.width = w;
    this._mistCanvas.height = h;
  }

  // ------------------------------
  // Animation
  // ------------------------------

  _startAnimation() {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);

    const animate = (now) => {
      this.animationFrame = requestAnimationFrame(animate);

      const frameInterval = 1000 / (this._config?.fps || 30);
      if (now - this.lastDrawTime < frameInterval) return;
      this.lastDrawTime = now;

      if (!this.ctx || !this._hass || !this._config) return;
      if (this.width <= 1 || this.height <= 1) return;

      this._draw(now);
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  _draw(now) {
    const { ctx, width, height } = this;
    const centerX = width / 2;
    const centerY = height / 2;

    // Re-read theme vars occasionally (cheap)
    if (now - this._lastThemeCheck > 1000) {
      this._lastThemeCheck = now;
      this._updateTheme();
    }

    // Smooth transitions (targets -> currents)
    ["speed", "color", "size"].forEach((f) => {
      this._currents[f] += (this._targets[f] - this._currents[f]) * this._lerpFactor;
    });

    const currentColor = this._interpolateColor(this._currents.color);
    const colorRGBA = (a) => currentColor.replace("rgb", "rgba").replace(")", `, ${a})`);

    // Advance time
    this.noiseTime += 0.008 + this._currents.speed * 0.02;

    // Clear fully (no trails)
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, width, height);

    // ---- Mist / cloud density layer (under the swarm dots) ----
    if (this._config.mist && this._mistCtx && this._mistCanvas) {
      const mctx = this._mistCtx;
      const mw = Math.max(1, this._mistCanvas.width);
      const mh = Math.max(1, this._mistCanvas.height);

      // Clear mist buffer
      mctx.setTransform(1, 0, 0, 1, 0, 0);
      mctx.clearRect(0, 0, mw, mh);

      // Build density map (white alpha blobs)
      mctx.globalCompositeOperation = "source-over";
      mctx.fillStyle = "rgba(255,255,255,0.10)";

      const blurPx = 6 + this._currents.size * 10;
      const canFilter = typeof mctx.filter === "string";
      if (canFilter) mctx.filter = `blur(${blurPx}px)`;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const x = (p.x / width) * mw;
        const y = (p.y / height) * mh;
        const r = 6 + p.size * 2;
        mctx.beginPath();
        mctx.arc(x, y, r, 0, Math.PI * 2);
        mctx.fill();
      }

      if (canFilter) mctx.filter = "none";

      // Tint the density map with currentColor
      mctx.globalCompositeOperation = "source-in";
      mctx.fillStyle = colorRGBA(0.22);
      mctx.fillRect(0, 0, mw, mh);

      // Draw mist to main canvas
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.drawImage(this._mistCanvas, 0, 0, width, height);
    }

    // ---------- SWARM (boids) ----------
    const n = this._currents.speed; // 0..1

    // Motion curve: calmer in low/mid range
    const nm = Math.pow(n, 1.8);

    // Motion tuning (birds feel)
    const maxSpeed = 0.8 + nm * 3.4;
    const neighborDist = 80 - nm * 30;
    const separationDist = 18 - nm * 6;

    const alignW = 0.9 + nm * 0.7;
    const cohesionW = 0.5 + nm * 0.4;
    const separationW = 1.3 + nm * 0.9;
    const noiseW = 0.18 + nm * 0.25;

    // Wind drift (slow, global)
    const windX = this._noise(10, 0, this.noiseTime * 0.35) * (0.06 + nm * 0.18);
    const windY = this._noise(0, 10, this.noiseTime * 0.35) * (0.06 + nm * 0.18);

    // Roost point (slowly drifting "center of gravity")
    const roostX = centerX + this._noise(100, 0, this.noiseTime * 0.18) * 40;
    const roostY = centerY + this._noise(0, 100, this.noiseTime * 0.18) * 40;
    const roostW = (0.010 * (1 - n)) + (0.004 * n);

    // Soft bounds (weakened) to avoid edge “ping-pong”
    const boundW = 0.0015 + nm * 0.003;
    const margin = 18;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      let count = 0;
      let avgVX = 0, avgVY = 0;
      let centerX2 = 0, centerY2 = 0;
      let sepX = 0, sepY = 0;

      for (let j = 0; j < this.particles.length; j++) {
        if (i === j) continue;
        const q = this.particles[j];
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > neighborDist * neighborDist) continue;

        count++;
        avgVX += q.vx;
        avgVY += q.vy;
        centerX2 += q.x;
        centerY2 += q.y;

        if (d2 < separationDist * separationDist && d2 > 0.0001) {
          const inv = 1 / Math.sqrt(d2);
          sepX -= dx * inv;
          sepY -= dy * inv;
        }
      }

      let ax = 0, ay = 0;

      if (count > 0) {
        // Alignment
        avgVX /= count;
        avgVY /= count;
        ax += (avgVX - p.vx) * alignW * 0.05;
        ay += (avgVY - p.vy) * alignW * 0.05;

        // Cohesion
        centerX2 /= count;
        centerY2 /= count;
        ax += (centerX2 - p.x) * cohesionW * 0.0007;
        ay += (centerY2 - p.y) * cohesionW * 0.0007;

        // Separation
        ax += sepX * separationW * 0.12;
        ay += sepY * separationW * 0.12;
      }

      // Flutter noise (local)
      p.phase += 0.03 + n * 0.05;
      ax += this._noise(p.x * 0.01, p.y * 0.01, this.noiseTime) * noiseW * 0.7;
      ay += this._noise(p.y * 0.01, p.x * 0.01, this.noiseTime + 7.7) * noiseW * 0.7;

      // Wind drift
      ax += windX;
      ay += windY;

      // Roost pull (keeps it centered)
      ax += (roostX - p.x) * roostW;
      ay += (roostY - p.y) * roostW;

      // Soft bounds
      if (p.x < margin) ax += (margin - p.x) * boundW;
      if (p.x > width - margin) ax -= (p.x - (width - margin)) * boundW;
      if (p.y < margin) ay += (margin - p.y) * boundW;
      if (p.y > height - margin) ay -= (p.y - (height - margin)) * boundW;

      // Integrate velocity
      p.vx += ax;
      p.vy += ay;

      // Limit speed
      const sp = Math.hypot(p.vx, p.vy) || 1;
      if (sp > maxSpeed) {
        p.vx = (p.vx / sp) * maxSpeed;
        p.vy = (p.vy / sp) * maxSpeed;
      }

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // ---------- DRAW ----------
      ctx.globalCompositeOperation = "source-over";

      const rad = Math.max(1.1, p.size * 0.8);
      const halo = rad * 1.3;

      // subtle halo
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, halo);
      g.addColorStop(0, colorRGBA(0.10));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, halo, 0, Math.PI * 2);
      ctx.fill();

      // core dot
      ctx.fillStyle = colorRGBA(0.85);
      ctx.beginPath();
      ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    // Debug overlay (optional)
    if (this._config.debug) {
      const ent = this._config.entity;
      const raw = ent ? this._hass.states[ent]?.state : "-";

      ctx.globalCompositeOperation = "source-over";
      ctx.save();
      ctx.fillStyle = this._theme?.isDark ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.55)";
      ctx.fillRect(6, 6, 210, 70);
      ctx.fillStyle =
        this._theme?.text ||
        (this._theme?.isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)");
      ctx.font = "12px sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`Value: ${raw}`, 12, 12);
      ctx.fillText(`norm(speed): ${this._currents.speed.toFixed(3)}`, 12, 28);
      ctx.fillText(`norm(size):  ${this._currents.size.toFixed(3)}`, 12, 44);
      ctx.fillText(`norm(color): ${this._currents.color.toFixed(3)}`, 12, 60);
      ctx.restore();
    }
  }

  render() {
    const entityId =
      this._config?.entity ||
      this._config?.entity_speed ||
      this._config?.entity_color ||
      this._config?.entity_size;

    const stateObj = entityId ? this._hass?.states?.[entityId] : null;

    const name =
      this._config?.name ||
      stateObj?.attributes?.friendly_name ||
      "";

    const value = stateObj?.state;
    const unit = stateObj?.attributes?.unit_of_measurement || "";

    const hasValue = value !== undefined && value !== null && value !== "unknown" && value !== "unavailable";
    const header = name
      ? (hasValue ? `${name}: ${value} ${unit}`.trim() : name)
      : "";

    return html`
      <ha-card .header=${header}>
        <div class="container">
          <canvas></canvas>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host { display: block; }

      ha-card {
        background: transparent; /* follow dashboard background */
        box-shadow: none;
        overflow: hidden;
        border-radius: var(--ha-card-border-radius, 12px);
        position: relative;
        width: 100%;
      }

      /* Square by default. Remove padding-bottom for non-square. */
      .container {
        position: relative;
        width: 100%;
        padding-bottom: 100%;
      }

      canvas {
        position: absolute;
        inset: 0;
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
  }
}

customElements.define("particle-cloud-card", ParticleCloudCard);

// Show up in the Lovelace card picker list
window.customCards = window.customCards || [];
window.customCards.push({
  type: "particle-cloud-card",
  name: "Particle Cloud Card",
  description: "Ambient swarm + mist particle visualization for numeric sensors",
  preview: true,
  documentationURL: "https://github.com/sonite/particle-cloud-card",
  author: "Christian Gruffman",
});
