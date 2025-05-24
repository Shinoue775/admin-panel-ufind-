const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// MySQL connection configuration
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'admin_dashboard'
});

// ✅ Get count of online users for index.html
app.get('/api/online-users/count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM online_users WHERE status = "online"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching online user count:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ count: results[0].count });
  });
});

// ✅ List of online users for active-users.html
app.get('/api/online-users', (req, res) => {
  const query = 'SELECT user_id, status, last_active FROM online_users WHERE status = "online"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching online users:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// ✅ Get count of uploaded missing items for index.html
app.get('/api/missing-items/count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM missing_items WHERE status = "uploaded"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching uploaded missing item count:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ count: results[0].count });
  });
});

// ✅ List of uploaded missing items for uploaded-missing-items.html
app.get('/api/missing-items/list', (req, res) => {
  const query = 'SELECT id, user_id, item_description FROM missing_items WHERE status = "uploaded"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching uploaded missing items:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// ✅ Get count of claimed missing items
app.get('/api/claimed-missing-items', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM claimed_missing_items WHERE status = "claimed"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching claimed missing items:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ count: results[0].count });
  });
});

// ✅ List of claimed missing items for claimed-missing-items.html
app.get('/api/claimed-missing-items/list', (req, res) => {
  const query = 'SELECT item_name, claimed_by FROM claimed_missing_items WHERE status = "claimed"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching claimed items list:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// ✅ Get count of reported posts
app.get('/api/reported-posts', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM reported_posts WHERE status = "active"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reported posts:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ count: results[0].count });
  });
});

// ✅ List of reported posts for reported-posts.html
app.get('/api/reported-posts/list', (req, res) => {
  const query = 'SELECT id, post_id, report_reason, reported_at FROM reported_posts WHERE status = "active"';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching reported posts list:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`✅ Admin Dashboard backend listening at http://localhost:${port}`);
});
