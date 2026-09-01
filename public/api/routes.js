const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

module.exports = (app, db) => {
  // ==================== AUTH ROUTES ====================

  // Register user
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, name, role } = req.body;

      if (!email || !password || !name || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);
      const userId = uuidv4();

      await db.query(
        `INSERT INTO users (id, email, password, name, role) VALUES ($1, $2, $3, $4, $5)`,
        [userId, email, hashedPassword, name, role]
      );

      res.json({ success: true, userId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Login user
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = rows[0];

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: '24h',
      });

      res.json({
        success: true,
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== CANDIDATE ROUTES ====================

  // Get all candidates
  app.get('/api/candidates', async (req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM candidates ORDER BY created_at DESC');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create candidate
  app.post('/api/candidates', async (req, res) => {
    try {
      const { name, email, phone, role } = req.body;
      const candidateId = uuidv4();

      await db.query(
        `INSERT INTO candidates (id, name, email, phone, role) VALUES ($1, $2, $3, $4, $5)`,
        [candidateId, name, email, phone, role]
      );

      res.json({ success: true, candidateId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update candidate
  app.put('/api/candidates/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { hiring_status, hiring_type, joining_date } = req.body;

      await db.query(
        `UPDATE candidates
         SET hiring_status = $1, hiring_type = $2, joining_date = $3, updated_at = CURRENT_TIMESTAMP
         WHERE id = $4`,
        [hiring_status, hiring_type, joining_date, id]
      );

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== FEEDBACK ROUTES ====================

  // Submit feedback
  app.post('/api/feedback', async (req, res) => {
    try {
      const {
        candidateId,
        round,
        technicalRating,
        behavioralRating,
        comments,
        goNoGo,
        submittedBy,
      } = req.body;

      const feedbackId = uuidv4();

      await db.query(
        `INSERT INTO feedback (
          id, candidate_id, round, technical_rating, behavioral_rating,
          comments, go_no_go, submitted_by, submitted_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)`,
        [feedbackId, candidateId, round, technicalRating, behavioralRating, comments, goNoGo, submittedBy]
      );

      // Update candidate status
      await db.query(
        `UPDATE candidates
         SET hiring_status = 'Feedback Submitted', updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [candidateId]
      );

      res.json({ success: true, feedbackId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get feedback for candidate
  app.get('/api/feedback/:candidateId', async (req, res) => {
    try {
      const { candidateId } = req.params;
      const { rows } = await db.query('SELECT * FROM feedback WHERE candidate_id = $1', [candidateId]);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== OFFER LETTER ROUTES ====================

  // Create offer letter
  app.post('/api/offer-letters', async (req, res) => {
    try {
      const { candidateId, templateId, salaryStructureId } = req.body;
      const offerId = uuidv4();

      await db.query(
        `INSERT INTO offer_letters (id, candidate_id, template_id, salary_structure_id)
         VALUES ($1, $2, $3, $4)`,
        [offerId, candidateId, templateId, salaryStructureId]
      );

      // Update candidate status
      await db.query(
        `UPDATE candidates
         SET hiring_status = 'Offer Released', updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [candidateId]
      );

      res.json({ success: true, offerId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get offer letter
  app.get('/api/offer-letters/:candidateId', async (req, res) => {
    try {
      const { candidateId } = req.params;
      const { rows } = await db.query(
        'SELECT * FROM offer_letters WHERE candidate_id = $1 ORDER BY version DESC',
        [candidateId]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update offer acceptance
  app.put('/api/offer-letters/:id/acceptance', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await db.query(`UPDATE offer_letters SET acceptance_status = $1 WHERE id = $2`, [status, id]);

      // If accepted, update candidate status
      if (status === 'Accepted') {
        const { rows } = await db.query('SELECT candidate_id FROM offer_letters WHERE id = $1', [id]);
        const offer = rows[0];
        if (offer) {
          await db.query(
            `UPDATE candidates
             SET hiring_status = 'Hired', updated_at = CURRENT_TIMESTAMP
             WHERE id = $1`,
            [offer.candidate_id]
          );
        }
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== SALARY STRUCTURE ROUTES ====================

  // Create salary structure
  app.post('/api/salary-structures', async (req, res) => {
    try {
      const {
        candidateId,
        role,
        basic,
        hra,
        da,
        specialAllowance,
        pf,
        esi,
        tds,
        professionalTax,
      } = req.body;

      const salaryId = uuidv4();
      const gross = basic + hra + da + specialAllowance;
      const deductions = pf + esi + tds + professionalTax;
      const net = gross - deductions;
      const annual = gross * 12;

      await db.query(
        `INSERT INTO salary_structures (
          id, candidate_id, role, basic, hra, da, special_allowance,
          pf, esi, tds, professional_tax, gross_salary, net_salary, annual_ctc
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [salaryId, candidateId, role, basic, hra, da, specialAllowance, pf, esi, tds, professionalTax, gross, net, annual]
      );

      res.json({ success: true, salaryId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get salary structure
  app.get('/api/salary-structures/:candidateId', async (req, res) => {
    try {
      const { candidateId } = req.params;
      const { rows } = await db.query('SELECT * FROM salary_structures WHERE candidate_id = $1', [candidateId]);
      res.json(rows[0] || {});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== POLICY ROUTES ====================

  // Get all policies
  app.get('/api/policies', async (req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM policies ORDER BY created_at DESC');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create policy
  app.post('/api/policies', async (req, res) => {
    try {
      const { title, category, filePath } = req.body;
      const policyId = uuidv4();

      await db.query(
        `INSERT INTO policies (id, title, category, file_path) VALUES ($1, $2, $3, $4)`,
        [policyId, title, category, filePath]
      );

      res.json({ success: true, policyId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== ONBOARDING ROUTES ====================

  // Create onboarding checklist
  app.post('/api/onboarding', async (req, res) => {
    try {
      const { candidateId } = req.body;
      const checklistId = uuidv4();

      await db.query(
        `INSERT INTO onboarding_checklists (id, candidate_id) VALUES ($1, $2)`,
        [checklistId, candidateId]
      );

      res.json({ success: true, checklistId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update onboarding checklist
  app.put('/api/onboarding/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { documentCollection, systemAccountCreated, assetAssignment } = req.body;

      await db.query(
        `UPDATE onboarding_checklists
         SET document_collection = $1, system_account_created = $2, asset_assignment = $3
         WHERE id = $4`,
        [documentCollection, systemAccountCreated, assetAssignment, id]
      );

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== INDUCTION ROUTES ====================

  // Create induction session
  app.post('/api/induction-sessions', async (req, res) => {
    try {
      const { title, scheduledDate, venueOrLink, agenda } = req.body;
      const sessionId = uuidv4();

      await db.query(
        `INSERT INTO induction_sessions (id, title, scheduled_date, venue_or_link, agenda)
         VALUES ($1, $2, $3, $4, $5)`,
        [sessionId, title, scheduledDate, venueOrLink, agenda]
      );

      res.json({ success: true, sessionId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get all induction sessions
  app.get('/api/induction-sessions', async (req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM induction_sessions ORDER BY scheduled_date ASC');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== COMMUNICATION ROUTES ====================

  // Log communication
  app.post('/api/communications', async (req, res) => {
    try {
      const { candidateId, type, subject, message, status } = req.body;
      const commId = uuidv4();

      await db.query(
        `INSERT INTO communication_logs (id, candidate_id, type, subject, message, status, sent_at)
         VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`,
        [commId, candidateId, type, subject, message, status]
      );

      res.json({ success: true, commId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get communication logs
  app.get('/api/communications/:candidateId', async (req, res) => {
    try {
      const { candidateId } = req.params;
      const { rows } = await db.query(
        'SELECT * FROM communication_logs WHERE candidate_id = $1 ORDER BY sent_at DESC',
        [candidateId]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // ==================== REPORTS ROUTES ====================

  // Get hiring report
  app.get('/api/reports/hiring', async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      let query = `SELECT hiring_type, COUNT(*) as count FROM candidates WHERE hiring_status = 'Hired'`;
      const params = [];
      if (startDate && endDate) {
        query += ` AND created_at BETWEEN $1 AND $2`;
        params.push(startDate, endDate);
      }
      query += ' GROUP BY hiring_type';

      const { rows } = await db.query(query, params);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get offer acceptance ratio
  app.get('/api/reports/offer-acceptance', async (req, res) => {
    try {
      const { rows } = await db.query(`
        SELECT acceptance_status, COUNT(*) as count
        FROM offer_letters
        GROUP BY acceptance_status
      `);
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get pending tasks
  app.get('/api/reports/pending-tasks', async (req, res) => {
    try {
      const pendingFeedback = await db.query(
        `SELECT COUNT(*) as count FROM candidates WHERE hiring_status = 'Feedback Pending'`
      );
      const pendingOnboarding = await db.query(
        `SELECT COUNT(*) as count FROM onboarding_checklists WHERE completed_at IS NULL`
      );

      res.json({
        pendingFeedback: parseInt(pendingFeedback.rows[0].count, 10),
        pendingOnboarding: parseInt(pendingOnboarding.rows[0].count, 10),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
