const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  // Create table
  db.run(`CREATE TABLE secrets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    system_name TEXT,
    secret_key TEXT,
    description TEXT
  )`);

  // Insert fake secrets
  const insert = db.prepare('INSERT INTO secrets (system_name, secret_key, description) VALUES (?, ?, ?)');
  insert.run('AWS Production', 'AKIAIOSFODNN7EXAMPLE', 'Root user access key for primary AWS account');
  insert.run('Stripe Billing', 'sk_live_51Mabc...xyz', 'Live secret key for payment processing');
  insert.run('SendGrid API', 'SG.abcXYZ123...', 'API key for sending transactional emails');
  insert.run('Database Password', 'P@ssw0rd_Prod_!998', 'Master password for production PostgreSQL');
  insert.run('Admin Portal', 'admin_override_token_77', 'Bypass token for internal admin portal');
  insert.finalize();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Vulnerable Search API
app.get('/api/search', (req, res) => {
  const query = req.query.q || '';
  
  // VULNERABLE SQL QUERY: Directly concatenating user input
  const sql = `SELECT * FROM secrets WHERE system_name = '${query}'`;
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Database error occurred' });
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`KeyVault Server running at http://localhost:${port}`);
});
