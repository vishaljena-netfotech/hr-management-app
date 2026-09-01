const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

async function createTables(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      department TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS candidates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      role TEXT NOT NULL,
      hr_round_status TEXT DEFAULT 'Pending',
      final_round_status TEXT DEFAULT 'Pending',
      hiring_status TEXT DEFAULT 'Feedback Pending',
      hiring_type TEXT,
      joining_date TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS feedback (
      id TEXT PRIMARY KEY,
      candidate_id TEXT NOT NULL REFERENCES candidates(id),
      round TEXT NOT NULL,
      technical_rating INTEGER,
      behavioral_rating INTEGER,
      comments TEXT,
      go_no_go TEXT,
      submitted_by TEXT REFERENCES users(id),
      submitted_at TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS offer_letters (
      id TEXT PRIMARY KEY,
      candidate_id TEXT NOT NULL REFERENCES candidates(id),
      template_id TEXT,
      salary_structure_id TEXT,
      generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      sent_at TIMESTAMP,
      acceptance_status TEXT DEFAULT 'Pending',
      version INTEGER DEFAULT 1
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS salary_structures (
      id TEXT PRIMARY KEY,
      candidate_id TEXT NOT NULL REFERENCES candidates(id),
      role TEXT NOT NULL,
      basic REAL,
      hra REAL,
      da REAL,
      special_allowance REAL,
      pf REAL,
      esi REAL,
      tds REAL,
      professional_tax REAL,
      gross_salary REAL,
      net_salary REAL,
      annual_ctc REAL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS policies (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      file_path TEXT,
      version INTEGER DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS policy_acknowledgments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      policy_id TEXT NOT NULL REFERENCES policies(id),
      acknowledged_at TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS communication_templates (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      subject TEXT,
      message TEXT,
      created_by TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS onboarding_checklists (
      id TEXT PRIMARY KEY,
      candidate_id TEXT NOT NULL REFERENCES candidates(id),
      document_collection BOOLEAN DEFAULT FALSE,
      system_account_created BOOLEAN DEFAULT FALSE,
      asset_assignment BOOLEAN DEFAULT FALSE,
      completed_at TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS induction_sessions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      scheduled_date TIMESTAMP NOT NULL,
      venue_or_link TEXT,
      agenda TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS induction_attendance (
      id TEXT PRIMARY KEY,
      candidate_id TEXT NOT NULL REFERENCES candidates(id),
      session_id TEXT NOT NULL REFERENCES induction_sessions(id),
      attended BOOLEAN DEFAULT FALSE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS communication_logs (
      id TEXT PRIMARY KEY,
      candidate_id TEXT NOT NULL REFERENCES candidates(id),
      type TEXT NOT NULL,
      subject TEXT,
      message TEXT,
      status TEXT DEFAULT 'Pending',
      sent_at TIMESTAMP
    );
  `);
}

// Creates the default super admin account documented in SETUP_INSTRUCTIONS.md
// (admin@hr.com / admin123) if no users exist yet. Change this password after
// first login.
async function seedDefaultAdmin(pool) {
  const { rows } = await pool.query('SELECT COUNT(*) AS count FROM users');
  if (parseInt(rows[0].count, 10) > 0) return;

  const id = uuidv4();
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  await pool.query(
    `INSERT INTO users (id, email, password, name, role) VALUES ($1, $2, $3, $4, $5)`,
    [id, 'admin@hr.com', hashedPassword, 'Super Admin', 'Super Admin']
  );

  console.log('Seeded default admin user: admin@hr.com / admin123 (please change this password)');
}

async function initializeDatabase(connectionString) {
  const pool = new Pool({
    connectionString,
    ssl:
      process.env.PGSSL === 'false'
        ? false
        : process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  });

  // Fail fast with a clear error if the DB isn't reachable, instead of the
  // app silently starting broken.
  await pool.query('SELECT 1');

  await createTables(pool);
  await seedDefaultAdmin(pool);
  return pool;
}

module.exports = { initializeDatabase, createTables, seedDefaultAdmin };
