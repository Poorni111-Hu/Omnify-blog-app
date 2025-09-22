const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend')); // serve frontend files

// In-memory DB
let users = [];
let blogs = [
  { id: 1, title: "Welcome to Omnify Blog App", content: "This is the first post in Omnify Blog App!", author: "poornima@example.com", likes: 0, comments: [] },
  { id: 2, title: "How to Build Your First Blog", content: "Blogging is a great way to share your ideas with the world.", author: "poornima@example.com", likes: 0, comments: [] }
];

// User signup
app.post('/signup', (req,res)=>{
  const { email, password } = req.body;
  if(users.find(u => u.email === email)) return res.status(400).json({error:"Email exists"});
  users.push({ email, password });
  res.json({message:"Signup successful"});
});

// User login
app.post('/login', (req,res)=>{
  const { email, password } = req.body;
  const user = users.find(u => u.email===email && u.password===password);
  if(!user) return res.status(400).json({error:"Invalid credentials"});
  res.json({message:"Login successful"});
});

// Get all blogs
app.get('/blogs', (req,res)=>{
  res.json(blogs);
});

// Create blog
app.post('/blogs', (req,res)=>{
  const { title, content, author } = req.body;
  const id = blogs.length + 1;
  blogs.push({ id, title, content, author, likes: 0, comments: [] });
  res.json({message:"Blog published", id});
});

// Edit blog
app.put('/blogs/:id', (req,res)=>{
  const blog = blogs.find(b => b.id == req.params.id);
  if(!blog) return res.status(404).json({error:"Blog not found"});
  const { title, content, author } = req.body;
  if(blog.author !== author) return res.status(403).json({error:"Not author"});
  blog.title = title; blog.content = content;
  res.json({message:"Blog updated"});
});

// Delete blog
app.delete('/blogs/:id', (req,res)=>{
  const blog = blogs.find(b => b.id == req.params.id);
  if(!blog) return res.status(404).json({error:"Blog not found"});
  const { author } = req.body;
  if(blog.author !== author) return res.status(403).json({error:"Not author"});
  blogs = blogs.filter(b => b.id != req.params.id);
  res.json({message:"Blog deleted"});
});

// Like blog
app.post('/blogs/:id/like', (req,res)=>{
  const blog = blogs.find(b => b.id == req.params.id);
  if(!blog) return res.status(404).json({error:"Blog not found"});
  blog.likes++;
  res.json({likes: blog.likes});
});

// Add comment
app.post('/blogs/:id/comment', (req,res)=>{
  const blog = blogs.find(b => b.id == req.params.id);
  if(!blog) return res.status(404).json({error:"Blog not found"});
  const { author, comment } = req.body;
  blog.comments.push({author, comment});
  res.json({comments: blog.comments});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));
