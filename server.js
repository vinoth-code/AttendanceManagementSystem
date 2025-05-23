const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '09011', // your password here
  database: 'attendance_system'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// Add student
app.post('/addStudent', (req, res) => {
  const { studentId, studentName } = req.body;
  db.query(
    'INSERT INTO students (student_id, student_name) VALUES (?, ?)',
    [studentId, studentName],
    err => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Student added' });
    }
  );
});

// Get all students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

// Save attendance
app.post('/attendance', (req, res) => {
  const { records, date } = req.body;
  if (!records || !date || records.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty data' });
  }

  db.query('DELETE FROM attendance WHERE date = ?', [date], err => {
    if (err) return res.status(500).send(err);

    const values = records.map(r => [r.studentId, date, r.present]);
    db.query(
      'INSERT INTO attendance (student_id, date, present) VALUES ?',
      [values],
      err => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'Attendance saved successfully' });
      }
    );
  });
});

app.listen(3000, () => console.log('🌐 Server running at http://localhost:3000'));
