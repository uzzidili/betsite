# Betsite V2 — Global Football Value Scanner

A mobile-first Next.js 16 football odds scanner built for Vercel. It dynamically discovers active football sports from The Odds API, compares bookmaker prices, ranks value opportunities, and builds conservative 2-leg/3-leg combinations.

## Important model limitation
V2's “model probability” is a **market-derived consensus estimate**, not an independently trained football prediction model. The UI labels this explicitly. V3 can add historical data, independently trained probabilities, ROI, CLV and calibration.

## Features
- Dynamic active football/soccer discovery
- Multiple countries/leagues via The Odds API
- Server-side Odds API key
- Best bookmaker price per selection
- Market-implied probability
- Market-derived consensus model probability
- Edge/value ranking
- 1.90–2.10 target odds centred on 2.00
- 2-leg and 3-leg accumulators
- Same-event correlation blocking by default
- Explicit NO BET state
- Mobile-friendly dashboard
- Automated tests + GitHub Actions
- Vercel-ready

## Local setup
Use Node.js 20.9+.

```bash
cp .env.example .env.local
# put your real key in .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment variables
See `.env.example`. Never use `NEXT_PUBLIC_ODDS_API_KEY`; secret keys must remain server-side.

## API routes
- `GET /api/health`
- `GET /api/scan`

## Deployment
Import `uzzidili/betsite` into Vercel, keep Root Directory as the repository root, and add `ODDS_API_KEY` plus optional tuning variables under Project Settings → Environment Variables. Redeploy after changing production environment variables.

## CI
GitHub Actions runs lint, tests and production build on pushes to `main` and pull requests.

## V3-ready architecture
The calculation logic lives in `lib/` so historical storage/modeling can be added without rewriting the UI.
