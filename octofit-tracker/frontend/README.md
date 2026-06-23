# Octofit Tracker Frontend

React 19 presentation tier for the Octofit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` before running the Vite app so browser requests target the forwarded backend URL:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

For local development, put it in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the app calls endpoints such as `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`. If it is unset, the app falls back to `http://localhost:8000/api` to avoid generating `https://undefined-8000...` URLs.
