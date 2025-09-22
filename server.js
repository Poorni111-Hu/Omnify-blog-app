const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// In-memory “database” (just for assignment demo)
let blogs = [];
let users = [];

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend')); // serve frontend folder

// Signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if(users.find(u=>u.email===email)) return res.json({error:"User already exists"});
  users.push({email, password});
  res.json({message:"Signup successful"});
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u=>u.email===email && u.password===password);
  if(user) res.json({message:"Login successful"});
  else res.json({error:"Invalid credentials"});
});

// Create blog
app.post('/blogs', (req, res) => {
  const { title, content, author } = req.body;
  const id = blogs.length + 1;
  blogs.push({id, title, content, author});
  res.json({message:"Blog published", id});
});

// Get all blogs
app.get('/blogs', (req, res) => {
  res.json(blogs);
});

// Get blog by id
app.get('/blogs/:id', (req,res)=>{
  const blog = blogs.find(b=>b.id==req.params.id);
  if(blog) res.json(blog);
  else res.status(404).json({error:"Blog not found"});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
