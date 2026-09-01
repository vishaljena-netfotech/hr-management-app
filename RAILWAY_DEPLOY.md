# Deploying to Railway (with PostgreSQL)

This was originally an Electron desktop app — the API server ran inside
Electron, storage was a local SQLite file, and the frontend was hardcoded to
`http://localhost:3001`. It's now a standalone web app backed by Postgres:

- **`server.js`** — a plain Express server that serves the React build and
  the same API. Doesn't touch `public/electron.js`, so the desktop build
  still works if you need it.
- **`public/api/db.js`** — Postgres schema + connection setup (was SQLite).
  Seeds a default admin (`admin@hr.com` / `admin123`) on first run.
- **`public/api/routes.js`** — same endpoints, rewritten to query Postgres
  instead of SQLite.
- Frontend `API_BASE` now defaults to a relative path (same-origin), instead
  of `http://localhost:3001`.

I tested this whole flow locally against a real Postgres instance (login,
candidates, feedback, salary structures, offer letters, reports) before
handing it to you, so this isn't just theoretical — it works.

## Baby steps

**1. Push the code to GitHub**
```bash
cd hr-desktop-app        # wherever you unzipped this
git init
git add .
git commit -m "Convert to standalone web app with Postgres, for Railway"
git branch -M main
git remote add origin <your-empty-repo-url>
git push -u origin main
```

**2. Create the Railway project**
- Go to https://railway.app → **New Project** → **Deploy from GitHub repo**
- Pick this repo. Railway reads `railway.json` and builds it automatically
  (Nixpacks) — no Dockerfile needed.

**3. Add Postgres**
- In the same Railway project, click **New** → **Database** → **Add
  PostgreSQL**.
- Go to your app service → **Variables** → **New Variable** → **Add
  Reference** → pick the Postgres service's `DATABASE_URL`. This wires the
  two services together automatically.

**4. Set your app's environment variables**
- On your app service → **Variables**, add:
  - `JWT_SECRET` — a long random string. Generate one:
    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
    ```
  (`DATABASE_URL` is already set from step 3. `PORT` and `NODE_ENV` are set
  by Railway automatically.)

**5. Deploy**
- Railway redeploys automatically once variables are set (or click
  **Deploy** manually).
- Build: `npm install --legacy-peer-deps && npm run web-build`
- Start: `npm run web-start` (= `node server.js`)
- Watch the deploy logs for `HR app server listening on port ...` and
  `Seeded default admin user: admin@hr.com / admin123`.

**6. Open it and log in**
- Click the Railway-generated URL (Settings → Networking → Generate Domain
  if you don't see one yet).
- Log in with `admin@hr.com` / `admin123`.
- **Change this password immediately** from User Management — the app is
  now public on the internet.

## Notes

- Postgres is fully managed by Railway — backups, no volume config needed,
  and it survives redeploys automatically (unlike the earlier SQLite
  version).
- `better-sqlite3` stays in `package.json` only because the desktop
  (Electron) build still uses it — it's unrelated to the web deployment.
- If a connection ever fails with an SSL error, set `PGSSL=false` in
  Variables (only needed for non-Railway Postgres providers that don't
  support SSL).
