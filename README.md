# NEEDLEDROP

A mobile-first Progressive Web App for dropping a GPS "needle" and tracking
your way back to it with a tactical directional radar — built for use fully
offline (festivals, trails, anywhere without signal).

## Stack

- [Vite](https://vite.dev) + React
- [Tailwind CSS v4](https://tailwindcss.com)
- [Lucide React](https://lucide.dev) icons
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app) (Workbox service worker, installable manifest)

## Features

- **Drop a needle** — save your current GPS location with a custom label (or a timestamp default).
- **Radar tracking** — a rotating arrow points toward your active needle, with live distance (Haversine formula) and bearing calculations.
- **Lock confirmation** — pulsing "TARGET REACHED" state when within 5 meters.
- **Calibration warning** — when the device can't report a heading, a tactical overlay prompts you to walk to calibrate direction from GPS movement.
- **Needle Vault** — a slide-up history log of all saved needles, persisted to `localStorage`. Re-engage or delete any past drop.
- **Fully offline** — the app shell, assets, and static resources are precached by the service worker so NEEDLEDROP works with zero connectivity.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/
    Header.jsx         top status HUD
    RadarDisplay.jsx    radar grid, rotating arrow, lock state
    ControlCenter.jsx   drop-needle button + label prompt
    NeedleVault.jsx      slide-up history sheet
    NeedleIcon.jsx        custom tactical needle SVG icon
  hooks/
    useGeolocation.js   watchPosition + heading tracking
    useNeedles.js         localStorage-backed needle state
  utils/
    geo.js                Haversine distance + bearing math
```
