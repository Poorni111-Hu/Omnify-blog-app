const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

const db = new sqlite3.Database(':memory:'); // in-memory DB

// Create table
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    author TEXT
  )`);
});

// Routes

// Signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  db.run('INSERT INTO users(email, password) VALUES(?, ?)', [email, password], function(err){
    if(err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Signup successful' });
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email=? AND password=?', [email, password], (err, row)=>{
    if(err) return res.status(500).json({ error: err.message });
    if(!row) return res.status(400).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful', user: row });
  });
});

// Create blog
app.post('/blogs', (req, res)=>{
  const { title, content, author } = req.body;
  db.run('INSERT INTO blogs(title, content, author) VALUES(?, ?, ?)', [title, content, author], function(err){
    if(err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Blog created', id: this.lastID });
  });
});

// List blogs
app.get('/blogs', (req, res)=>{
  db.all('SELECT * FROM blogs', [], (err, rows)=>{
    if(err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Blog detail
app.get('/blogs/:id', (req, res)=>{
  const id = req.params.id;
  db.get('SELECT * FROM blogs WHERE id=?', [id], (err, row)=>{
    if(err) return res.status(500).json({ error: err.message });
    if(!row) return res.status(404).json({ error: 'Blog not found' });
    res.json(row);
  });
});

// Delete blog
app.delete('/blogs/:id', (req, res)=>{
  const id = req.params.id;
  db.run('DELETE FROM blogs WHERE id=?', [id], function(err){
    if(err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Blog deleted' });
  });
});

// Update blog
app.put('/blogs/:id', (req, res)=>{
  const id = req.params.id;
  const { title, content } = req.body;
  db.run('UPDATE blogs SET title=?, content=? WHERE id=?', [title, content, id], function(err){
    if(err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Blog updated' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
