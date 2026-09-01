// Standalone web server for deploying the HR app to Railway (or any Node host).
// This is separate from public/electron.js, which still runs the desktop version.
const path = require('path');
const express = require('express');
const cors = require('cors');

const { initializeDatabase } = require('./public/api/db');

const PORT = process.env.PORT || 3001;

// Railway's Postgres plugin injects DATABASE_URL automatically when attached
// to this service. For local dev, set it yourself (see .env.railway.example).
const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set. Attach a Postgres database and/or set it in your environment.');
  process.exit(1);
}

async function main() {
  const db = await initializeDatabase(DATABASE_URL);

  const app = express();
  app.use(cors());
  app.use(express.json());

  // API routes (shared with the desktop app's route definitions)
  require('./public/api/routes')(app, db);

  // Serve the built React app
  const buildPath = path.join(__dirname, 'build');
  app.use(express.static(buildPath));

  // SPA fallback: any non-API route serves index.html so React Router can handle it
  app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`HR app server listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
