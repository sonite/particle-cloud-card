# Particle Cloud Card (Swarm + Cloud)

A Home Assistant Lovelace custom card that visualizes a numeric sensor as an **ambient swarm** (boids / flocking) with an optional **cloud “mist” layer** — designed for power usage, but works with any numeric entity.

- **Swarm motion**: bird-like flocking (alignment / cohesion / separation)
- **Cloud feel**: optional density/mist layer under the swarm
- **Theme-aware**: text/overlays adapt to light/dark themes
- **Generic input**: use any numeric entity (e.g. W, price, flow)

> Typical use case: power consumption in Watts (e.g. 500–800W calm and green; higher loads tighten and intensify).

---

## Screenshots

Add your own screenshots here:
- `screenshots/preview-dark.png`
- `screenshots/preview-light.png`

---

## Installation

### Option A: HACS (recommended)
1. HACS → **Frontend**
2. Add this repository as a **Custom Repository** (type: Lovelace)
3. Install **Particle Cloud Card**
4. Restart Home Assistant (or reload resources)
5. Add the card to your dashboard

### Option B: Manual
1. Copy `dist/particle-cloud-card.js` to:

   `/config/www/particle-cloud-card.js`

2. In Home Assistant:
   - Settings → Dashboards → **Resources**
   - Add resource URL:

   `/local/particle-cloud-card.js`

   Type: **JavaScript Module**

3. Add the card to a dashboard.

> Tip: If you’re iterating, use a cache buster:
> `/local/particle-cloud-card.js?v=1` and increment `v=` when you update the file.

---

## Usage

Basic example:

```yaml
type: custom:particle-cloud-card
entity: sensor.ams_ec5d_p
fps: 24
particle_count: 320
show_value: true

# Range tuning (Watts) - adjust to your home
speed_min: 200
speed_max: 2500
color_min: 200
color_max: 4000
size_min: 200
size_max: 2500

palette:
  - [0.00, "#4dff88"]
  - [0.70, "#7dff9f"]
  - [0.85, "#ffd166"]
  - [0.95, "#ff9f5a"]
  - [1.00, "#ff4d4d"]
