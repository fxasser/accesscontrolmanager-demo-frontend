# Project Demo Template (Static Frontend)

Template repo for building public project demo frontends using **Pico.css** + vanilla JS.

## What’s included
- Clean static structure (`public/`)
- `config.js` for API base URL
- `api.js` fetch wrapper pattern
- `ui.js` rendering helpers
- Simple UI layout with an output panel

## How to use
1. Click **Use this template** to create a new repo.
2. Update:
   - `public/js/config.js` (set `API_BASE`)
   - text in `public/index.html`
   - endpoint paths in `public/js/api.js`
3. Deploy the `public/` folder as a static site (Nginx, GitHub Pages, etc.).

## Notes
Designed to pair with a privately hosted backend API so you can demo projects without exposing private/course code.

## Configuration
1. Copy `public/js/config.example.js` to `public/js/config.js`
2. Edit `public/js/config.js` and set `API_BASE` to backend URL

## Attribution
- UI styling uses [Pico.css](https://picocss.com/) (loaded via CDN).