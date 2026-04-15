# AccessControlManager Demo (Static Frontend)

Public static demo frontend for **AccessControlManager**.  
This UI calls a **privately hosted backend API** so the coursework backend/source code stays private.

## What you can do
- Get violations report
- Get warnings report
- Get all rules report
- Check permissions for a specific user/action/resource

## Datasets
Preset datasets are small, synthetic CSV inputs (no real patient data):
- **Dataset A (baseline):** includes violations + warnings + rules
- **Dataset B (no violations):** violations report shows “No Violations found”
- **Dataset C (no warnings):** warnings report shows “No Warnings found”
- **Dataset D (no rules):** rules report shows “No rules exist”; permissions are unknown

## Configuration
1. Copy `public/js/config.example.js` to `public/js/config.js`
2. Set `API_BASE`:
   - Recommended (same domain proxy): `const API_BASE = "";` and the site calls `/api/...`
   - Alternate (separate API domain): set `API_BASE` to your API base URL (no trailing slash)

## Deploy
Deploy the `public/` folder as a static site (e.g., Nginx, GitHub Pages).  
If using Nginx Proxy Manager, proxy `/api` to your backend wrapper service.

## Attribution
- UI styling uses [Pico.css](https://picocss.com/) (loaded via CDN).