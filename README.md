# AVW Global Intelligence

Static Progressive Web App (PWA), deployed on Netlify.

## Deploy
1. Upload the contents of this folder to the root of the GitHub repository connected to Netlify.
2. Ensure Netlify publishes the repository root (`netlify.toml` is included).
3. Push to the production branch. Netlify should deploy automatically.
4. Open the HTTPS site in Chrome on Android and use **Install AVW Global Intelligence** when offered, or Chrome's menu > Install app.

## Updating the app
- Make changes and push them to the connected GitHub branch.
- Netlify deploys the new version.
- Increment `VERSION` in `sw.js` whenever the app shell changes.
- The service worker shows an in-app update prompt when a new worker is waiting. The user can accept it to activate and reload.

## Data notes
- Country indicators come from the World Bank API. The app requests up to five recent non-empty observations and selects the newest observation per country and indicator.
- Risk scores use available political stability, inflation and GDP growth observations, with weights normalised across available components. Missing observations remain `n/a`; the app does not fabricate values.
- Crypto market cards use CoinGecko. Currency history uses Frankfurter. If a provider is unavailable, the relevant feed reports unavailable rather than displaying synthetic market prices.
- GDELT supplies news headlines. Provider rate limits or missing coverage can still result in temporary gaps.

## PWA notes
The manifest includes required app metadata and 192px/512px icons. The service worker caches the app shell defensively so one missing optional asset does not prevent installation.
