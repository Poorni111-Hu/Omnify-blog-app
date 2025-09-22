# Omnify Blog App

This is a **Full Stack Blog Application** built for the Omnify Full Stack Intern assignment.

## Features
- User signup & login (authentication)
- Only logged-in users can create blogs
- Public blog listing with pagination
- Blog detail page (full content view)
- Blog creation, update, and deletion
- Responsive design (desktop & mobile)
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + SQLite

## Deployment
The app is deployed on Render:
[Live Demo](https://omnify-blog-app-a9r0.onrender.com)

## Usage
1. Signup as a new user
2. Login to create a blog
3. View blogs publicly
4. Optional: use Postman to edit/delete blogs

Getting Started (Local Setup)

Install dependencies
npm install

Start the server
npm start

Open the app in your browser
Signup/Login to create blogs
Visit homepage to see public blogs.

Folder Structure
omnify-blog-app/
│
├─ server.js          # Node.js backend + API endpoints
├─ frontend/
│   ├─ index.html     # Homepage
│   ├─ signup.html    # Signup page
│   ├─ login.html     # Login page
│   ├─ create.html    # Create blog page
│   ├─ style.css      # Styling for all pages
├─ README.md
└─ package.json

API Endpoints
Endpoint	Method	Description
/signup	POST	Register a new user
/login	POST	Login an existing user
/blogs	GET	Get all blogs
/blogs	POST	Create a new blog
