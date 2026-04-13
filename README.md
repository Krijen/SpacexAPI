# SpaceX Launch Tracker

A full-stack dashboard for tracking every SpaceX rocket launch — built with React, TypeScript, and Node.js.

## Features

- **Dashboard** — Overview of all SpaceX launches with mission patches, status badges, and key metadata
- **Search** — Real-time search by mission name, flight number, or description
- **Filters** — Filter launches by status: All / Success / Failed / Upcoming
- **Sort** — Toggle between newest-first and oldest-first
- **Stats Bar** — Live counts of total, successful, failed, and upcoming launches + success rate
- **Launch Detail** — Full mission page with:
  - Embedded YouTube webcast video
  - Mission patch and full description
  - Rocket specifications (type, height, mass, engines, propellants, cost, etc.)
  - Core recovery information
  - Failure analysis (when applicable)
  - Links to Wikipedia, press articles, and webcasts

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, TypeScript, React Router  |
| Backend   | Node.js, Express, TypeScript        |
| Data      | SpaceX Open API v5 (api.spacexdata.com) |
| Styling   | Plain CSS with CSS custom properties |

## Project Structure

```
spacex-dashboard/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Express app entry point
│   │   ├── routes/
│   │   │   ├── launches.ts   # GET /api/launches, GET /api/launches/:id
│   │   │   └── rockets.ts    # GET /api/rockets, GET /api/rockets/:id
│   │   ├── services/
│   │   │   └── spacexService.ts  # SpaceX API calls
│   │   └── types/
│   │       └── spacex.ts     # TypeScript interfaces
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.tsx           # Router setup
│   │   ├── index.tsx         # React entry point
│   │   ├── index.css         # Global styles + theme variables
│   │   ├── components/
│   │   │   ├── Header.tsx    # Top navigation bar
│   │   │   ├── LaunchCard.tsx # Launch list item
│   │   │   ├── SearchBar.tsx  # Search input
│   │   │   ├── FilterBar.tsx  # Status filter buttons
│   │   │   └── StatsBar.tsx   # Summary statistics
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx  # Main launches list
│   │   │   └── LaunchDetail.tsx # Single launch view
│   │   ├── hooks/
│   │   │   └── useSpaceX.ts  # Data-fetching hooks
│   │   └── types/
│   │       └── index.ts      # Shared TypeScript types
│   ├── package.json
│   └── tsconfig.json
│
├── package.json              # Root scripts
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v16+
- npm v8+

### 1. Install dependencies

```bash
# Install root dev tools
npm install

# Install backend + frontend deps
npm run install:all
```

### 2. Run in development mode

Open **two terminals**:

**Terminal 1 — Backend (port 3001):**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend (port 3000):**
```bash
cd frontend
npm start
```

Or use the root script (requires `npm-run-all`):
```bash
npm run dev
```

### 3. Open in browser

Visit [http://localhost:3000](http://localhost:3000)

The frontend proxies `/api/*` requests to `http://localhost:3001` automatically (configured via `"proxy"` in frontend `package.json`).

## API Endpoints

| Method | Endpoint               | Description                              |
|--------|------------------------|------------------------------------------|
| GET    | `/api/health`          | Health check                             |
| GET    | `/api/launches`        | All launches (sorted newest first)       |
| GET    | `/api/launches/:id`    | Single launch with full rocket details   |
| GET    | `/api/rockets`         | All rockets                              |
| GET    | `/api/rockets/:id`     | Single rocket                            |

## Data Source

All data is fetched live from the [SpaceX API v5](https://github.com/r-spacex/SpaceX-API) — a community-maintained, open REST API with no authentication required.
