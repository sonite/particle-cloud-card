![GitHub release](https://img.shields.io/github/v/release/sonite/particle-cloud-card?include_prereleases)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz/)
[![license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
<p align="center">
  <img src="images/logo.png" width="120">
</p>

# Particle Cloud Card (Swarm + Cloud)

A Home Assistant Lovelace custom card that visualizes a numeric sensor as an **ambient swarm** (boids / flocking) with an optional **cloud “mist” layer** — designed for power usage, but works with any numeric entity.

- **Swarm motion**: bird-like flocking (alignment / cohesion / separation)
- **Cloud feel**: optional density/mist layer under the swarm
- **Theme-aware**: text/overlays adapt to light/dark themes
- **Generic input**: use any numeric entity (e.g. W, price, flow)

> Typical use case: power consumption in Watts (e.g. 500–800W calm and green; higher loads tighten and intensify).

---

## Screenshots

 <p align="center"><img src="images/low-PC.png" width="200"></p>
 <p align="center"><img src="images/high-PC.png" width="200"></p>

---

## Installation

### Option A: HACS (recommended)
1. HACS → **Frontend**
2. Add this repository as a **Custom Repository** (type: Lovelace)
3. Install **Particle Cloud Card**
4. Restart Home Assistant (or reload resources)
5. Add the card to your dashboard

### Option B: Manual
1. Copy `particle-cloud-card.js` to:

   `/config/www/particle-cloud-card.js`

2. In Home Assistant:
   - Settings → Dashboards → **Resources**
   - Add resource URL:

   `/local/particle-cloud-card.js`

   Type: **JavaScript Module**

3. Add the card to a dashboard.

> Tip: If you’re iterating the code, use a cache buster:
> `/local/particle-cloud-card.js?v=1` and increment `v=` when you update the file.

---

## Usage

Basic example:

```yaml
type: custom:particle-cloud-card
entity: sensor.power_consumption
name: Power Consumption
# Motion / performance
mode: swarm
particle_count: 320
fps: 24

# Visuals
mist: true
show_mode_toggle: true
debug: false

# Normalization (low / normal / high)
normal: 3000
low: 1500
high: 4500

# Baselines at "normal" (0..1)
normal_speed: 0.35
normal_color: 0.50
normal_size: 0.45

# Palette (low -> mid -> high)
palette:
  - [0.00, "#4dff88"]
  - [0.70, "#ffd166"]
  - [1.00, "#ff4d4d"]

# Advanced
mist_ratio: 0.64
lerp_factor: 0.06
```

---

## Configuration

### Entities
You can drive speed/color/size from the same entity, or separate entities.
- entity: Primary sensor entity used to drive speed/color/size (unless entity_speed, entity_color, entity_size are set).
- name: Optional title override shown on the card.
- entity_speed: Drives motion intensity (calm → fast).
- entity_color: Drives palette interpolation (low → high color).
- entity_size: Drives particle size and mist “density” feel.

### Motion
- mode: Default motion model (swarm = flocking, vortex = spiral/orbit field).
- show_mode_toggle: Show a small button on the card to toggle swarm/vortex.

### Performance
- particle_count: Number of particles (more = nicer, higher CPU/GPU; swarm is heavier than vortex).
- fps: Frame rate cap for the animation (higher = smoother, higher CPU/GPU).

### Normalization (recommended: centered)
- normal: Center reference value (the “neutral” point where baselines apply).
- low: Value treated as “low” (defaults to normal * 0.5 if omitted).
- high: Value treated as “high” (defaults to normal * 1.5 if omitted).

### Baselines at normal (0..1)
- normal_speed: Baseline particle movement at normal (0..1).
- normal_color: Baseline palette position at normal (0..1).
- normal_size: Baseline particle size at normal (0..1).

### Visuals
- mist: Adds a soft “fog/cloud” layer behind particles for extra depth.
- debug: Draws an overlay with live values/targets to help tuning.

### Palette
palette is a list of [stop, color] where stop is 0..1:
```yaml
palette:
  - [0, "#00ff00"]
  - [0.5, "#ffff00"]
  - [1, "#ff0000"]
```
### Advanced
- mist_ratio: Mist render resolution relative to the card size (lower = faster, higher = sharper).
- lerp_factor: Smoothing factor for transitions (higher = snappier, lower = more “floaty”).

## Demo Mode (Manual Slider)

If you don’t have a suitable real sensor yet — or just want to explore and tune the visuals — you can drive the Particle Cloud Card using a **manual slider**.

This is useful for:
- Trying the card without real hardware
- Tuning color, motion, and density
- Screenshots / demos
- Development and testing

---

### Step: Create a slider using the UI (recommended)

1. Go to **Settings → Devices & Services → Helpers**
2. Click **Create Helper**
3. Choose **Number**
4. Configure it as follows:

| Setting | Value |
|------|------|
| **Name** | Particle Cloud Power |
| **Minimum value** | `0` |
| **Maximum value** | `11000` |
| **Step size** | `50` |
| **Unit of measurement** | `W` |
| **Display mode** | Slider |

Save.

Home Assistant will create a helper named: input_number.particle_cloud_power

+ (+)Add Card / By entity - find the helper name.


---

### Use the slider with the Particle Cloud Card
```yaml
type: custom:particle-cloud-card
entity: input_number.particle_cloud_power
min: 0
max: 11000
particle_count: 220
mist: true
```

---
## Development vs Release
- src/ → development source
- particle-cloud-card.js (root) → built release file used by Home Assistant / HACS
---

## Credits
Created by Christian Gruffman.

## License
MIT
