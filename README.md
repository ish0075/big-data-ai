# big-data-ai
AI-powered commercial real estate platform with LangChain + Firebase

## Installation

Install Node dependencies in both the front‑end and server directories:

```bash
cd frontend
npm install
```

```bash
cd ../real-estate-ai-system
npm install
```

The Next.js front‑end lives in `frontend/` while shared workflows are under
`real-estate-ai-system/`.

## Development

Run the Next.js dev server from **frontend**:

```bash
cd frontend
npm run dev
```

Launch the Python agent from **backend**:

```bash
python backend/crewai_agents/main.py
```

## Environment variables

Set the following variables before running the services:

```
OPENAI_API_KEY=<your OpenAI API key>
MYSQL_HOST=<database host>
MYSQL_USER=<database user>
MYSQL_PASSWORD=<database password>
N8N_WEBHOOK_URL=<URL for n8n webhooks>
```

The Node services read these values via `process.env` and the Python agent
expects them to be available in the environment as well.
