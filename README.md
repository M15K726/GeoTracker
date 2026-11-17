# AVW Global Intelligence

Static Progressive Web App (PWA) for Cloudflare Pages.

## Deploy on Cloudflare Pages
- Connect the GitHub repository and deploy the repository root.
- Framework preset: None. Build command: leave blank. Build output directory: `.` (repository root).
- The app is served from the repository root; no build step is required.
- After pushing changes to the production branch, Cloudflare Pages deploys automatically.

## Updating
- Increment `VERSION` in `sw.js` whenever app-shell assets change.
- The service worker caches the app shell and uses network-first navigation so deployed updates can be picked up.

## Data sources and limitations
- Country indicators: World Bank API. The newest available non-empty observation is used per country and indicator; reporting years can differ by indicator.
- Risk scores are indicative composites of available political stability, inflation and GDP growth data. Missing components are excluded and weights are normalised.
- Crypto prices: CoinGecko. Currency history: Frankfurter. News: GDELT. Provider outages, rate limits and reporting delays may cause temporary gaps.
- No synthetic market prices or fabricated country observations are displayed.
