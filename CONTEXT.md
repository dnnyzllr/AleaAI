# AleaAI Project Context

## Project Overview

AleaAI is an AI-powered NBA prediction market analyzer focused on Kalshi market uploads.

Users upload screenshots of Kalshi NBA markets/contracts. The app extracts the market details, verifies them with the user, pulls relevant NBA player statistics, calculates historical hit rates, compares those hit rates against Kalshi market pricing, and generates a plain-English risk analysis.

AleaAI does NOT guarantee trades, predict winners, or claim true probabilities. It provides historical trend analysis and market context.

---

## MVP Scope

Initial MVP:

* NBA markets only
* Kalshi screenshots only
* Upload-first workflow

Primary MVP flow:

1. User uploads a Kalshi NBA market screenshot
2. OpenAI Vision extracts contract details
3. User verifies or edits extracted details
4. Backend retrieves relevant NBA stats
5. Risk engine calculates historical hit rates
6. App compares hit rate against Kalshi price/implied probability
7. AI generates a plain-English risk report
8. Report is saved for the user

Example market:

* "Will Karl-Anthony Towns score 20+ points?"
* YES @ 68¢

Example extracted data:

```json
{
  "player": "Karl-Anthony Towns",
  "market": "points",
  "line": 20,
  "side": "yes",
  "price_cents": 68
}
```

---

## Tech Stack

Frontend:

* Next.js
* TypeScript
* Tailwind CSS
* Deployed on Vercel

Backend:

* FastAPI
* Python
* Deployed on Render

Database/Auth:

* Supabase PostgreSQL
* Supabase Auth

AI:

* OpenAI API
* OpenAI Vision for screenshot extraction
* Text model for report explanation

Sports Data:

* balldontlie API

Version Control:

* GitHub

CI/CD:

* GitHub Actions

---

## Repository Structure

```text
AleaAI/
  apps/
    web/          # Next.js frontend
    api/          # FastAPI backend
  .github/
    workflows/   # CI/CD workflows
  CONTEXT.md
  CLAUDE.md
  CODEX.md
  README.md
```

---

## Product Rules

AleaAI must never:

* Guarantee wins
* Tell users what to buy or sell as financial certainty
* Claim exact true probability
* Manufacture statistics
* Let AI invent numbers

AleaAI should:

* Use real historical stats
* Show implied probability from Kalshi price
* Compare market price to historical hit rate
* Explain risk factors clearly
* Tell users when data is limited
* Present scores as historical confidence/risk, not certainty

Use language like:

* "Historical hit rate"
* "Market-implied probability"
* "Risk signal"
* "Based on available data"
* "This market appears underpriced/overpriced relative to historical results"

Avoid language like:

* "Lock"
* "Guaranteed"
* "Will hit"
* "Free money"
* "True probability is definitely..."

---

## Core Analysis Logic

Kalshi price gives implied probability:

```text
YES price in cents = implied probability percentage
68¢ YES = roughly 68% implied probability
```

Historical hit rate:

```text
Historical Hit Rate = games where player cleared line / total games analyzed
```

Example:

```text
KAT 20+ Points
Last 20 games: 16/20
Historical hit rate: 80%
Kalshi YES price: 68¢
Market-implied probability: 68%
Difference: +12%
```

Interpretation:

```text
Historical trend is stronger than the current market price, but this is not a guaranteed edge.
```

---

## Confidence / Risk Output

Do not call this a true win probability.

Suggested labels:

```text
Strong Historical Support
Moderate Historical Support
Weak Historical Support
High Uncertainty
Insufficient Data
```

Suggested comparison score:

```text
Edge Signal = Historical Hit Rate - Market Implied Probability
```

Example ranges:

```text
+15 or higher: Strong positive historical signal
+5 to +14: Moderate positive historical signal
-4 to +4: Neutral / fairly priced historically
-5 to -14: Moderate negative historical signal
-15 or lower: Strong negative historical signal
```

---

## Report Structure

Each report should include:

1. Extracted Market

   * Player
   * Stat market
   * Line
   * Side
   * Kalshi price

2. Implied Probability

   * Price converted to implied probability

3. Historical Performance

   * Last 10 hit rate
   * Last 20 hit rate
   * Season hit rate if available

4. Market Comparison

   * Historical hit rate vs Kalshi implied probability
   * Difference

5. Risk Factors

   * Minutes volatility
   * Recent trend changes
   * Injury/rest uncertainty if available
   * Small sample concerns
   * Opponent/matchup if available later

6. Summary

   * Plain-English AI explanation using only backend-provided stats

---

## API Endpoints

Initial backend endpoints:

```text
GET /health
POST /extract-market
POST /analyze-market
GET /reports
GET /reports/{id}
```

### POST /extract-market

Input:

* Uploaded screenshot

Output:

```json
{
  "player": "Karl-Anthony Towns",
  "market": "points",
  "line": 20,
  "side": "yes",
  "price_cents": 68,
  "confidence": 0.91
}
```

### POST /analyze-market

Input:

```json
{
  "player": "Karl-Anthony Towns",
  "market": "points",
  "line": 20,
  "side": "yes",
  "price_cents": 68
}
```

Output:

```json
{
  "implied_probability": 68,
  "last_10_hit_rate": 80,
  "last_20_hit_rate": 75,
  "edge_signal": 7,
  "risk_label": "Moderate Positive Historical Signal",
  "summary": "..."
}
```

---

## Database Tables

Initial tables:

### users

* id
* email
* created_at

### uploads

* id
* user_id
* image_url
* created_at

### markets

* id
* upload_id
* player_name
* market_type
* line
* side
* price_cents
* extraction_confidence
* created_at

### reports

* id
* market_id
* implied_probability
* last_10_hit_rate
* last_20_hit_rate
* season_hit_rate
* edge_signal
* risk_label
* summary
* created_at

---

## Development Phases

### Phase 1

* Confirm Next.js frontend runs
* Confirm FastAPI backend runs
* Add upload page
* Add frontend/backend test request

### Phase 2

* Add OpenAI Vision market extraction
* Show editable verification screen

### Phase 3

* Add balldontlie player stat lookup
* Calculate hit rates

### Phase 4

* Add Kalshi price vs historical hit-rate comparison
* Generate report

### Phase 5

* Add Supabase auth and saved reports

### Phase 6

* Deploy frontend to Vercel
* Deploy backend to Render
* Add CI/CD with GitHub Actions

---

## Current Development Environment

Local frontend:

```text
apps/web
npm run dev
http://localhost:3000
```

Local backend:

```text
apps/api
source venv/Scripts/activate
uvicorn main:app --reload
http://localhost:8000
```

Use Git Bash as the preferred terminal.

---

## MVP Definition of Done

The MVP is complete when a user can:

1. Upload a Kalshi NBA market screenshot
2. Review extracted market details
3. Analyze the market
4. See implied probability
5. See historical hit rates
6. See market comparison
7. Read a plain-English risk report
8. Save or revisit the report
