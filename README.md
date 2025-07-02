# Big Data AI

This repository contains a prototype of the **Smart Real Estate Intelligence Platform**.
The project combines a Next.js frontend with a Python powered agent backend for
commercial real estate automation.

## Folder structure

```
frontend/   # Next.js 14 application (Tailwind CSS)
backend/    # Python CrewAI agents and tools
  crewai_agents/
    main.py
    agents/
      database_agent.py
  tools/
    mysql_tool.py
database/   # SQL schema and seed data
```

The backend agents are currently simple placeholders. They will eventually clean
uploaded CSV files, store property data in MySQL and match buyers with listings.

The frontend is a minimal Next.js app to be expanded with authentication and
pages such as `/matcher` and `/upload`.

Run the Node demo scripts in `real-estate-ai-system` or start the Next.js app
inside `frontend` with `npm run dev`.

## Deployment

### Frontend on Vercel

1. Sign in at [Vercel](https://vercel.com) and import this repository.
2. Set the **root directory** to `frontend` and choose the Next.js framework.
3. Add any required environment variables and deploy.

### Backend on Railway

1. Create a new project on [Railway](https://railway.app) and deploy from GitHub.
2. Set the root directory to `backend` and supply environment variables such as the OpenAI key.
3. Trigger `python crewai_agents/main.py` to run the agents.

### Database

Use a MySQL service like PlanetScale or Supabase. Apply `database/schema.sql` and update your connection URL in the backend configuration.

### Google OAuth

If enabling login, obtain OAuth credentials from Google Cloud and provide `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to the frontend.

## Usage

Run the development server:

```bash
cd frontend && npm run dev
```

Upload CSV files at `http://localhost:3000/upload`. The file will be passed to the Python
agents which insert the rows into MySQL and run a valuation task.

Start the agents manually via:

```bash
python backend/crewai_agents/main.py path/to/file.csv
```

## Database Schema

The schema includes buyers, properties and a sample `listings` table used for
valuations:

```sql
CREATE TABLE listings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  address VARCHAR(255),
  city VARCHAR(100),
  province VARCHAR(100),
  price DECIMAL(12, 2),
  square_feet INT,
  price_per_sf DECIMAL(10, 2),
  asset_class VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
