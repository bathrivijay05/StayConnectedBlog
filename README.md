# StayConnected – Full Stack News Blogging Platform

A modern, responsive news blogging platform built with React, Express.js, and PostgreSQL (Supabase).

## 🚀 Features

- **Authentication**: JWT-based auth with secure password hashing.
- **Content Management**: Rich text editor (React Quill) with image uploads via Supabase Storage.
- **Draft System**: Save posts as drafts, preview them privately, and publish when ready.
- **User Dashboard**: Manage your posts (Edit, Delete, View Status).
- **Categories**: Filter news by India, World, Business, Technology, Sports.
- **Responsive UI**: Completely overhauled design using SCSS with a mobile-first approach.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, SCSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via Supabase)
- **Storage**: Supabase Storage (for images)

## ⚙️ Setup

### 1. Clone & Install

```bash
git clone https://github.com/bathrivijay05/StayConnectedBlog.git
cd StayConnectedBlog

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

### 2. Environment Variables

**Backend (`backend/.env`)**

```env
# Database (Supabase Connection Pooler)
DB_HOSTNAME=aws-0-us-east-1.pooler.supabase.com
DB_PORT=6543
DB_USER=postgres.your-project
DB_PASSWORD=your_db_password
DB_DBNAME=postgres

# Supabase Storage (For Images)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_service_role_secret

# App Config
FRONTEND_URL=http://localhost:5173
PORT=8080
JWT_SECRET=your_jwt_secret
```

**Frontend (`frontend/.env`)**

```env
VITE_SERVER_BASE_URL=http://localhost:8080
```

### 3. Run Application

**Backend**

```bash
cd backend
npm start
```

**Frontend**

```bash
cd frontend
npm run dev
```

## 📁 Project Structure

```
backend/
├── controllers/  # Business logic (Auth, Posts, Uploads)
├── middleware/   # JWT verification
├── routes/       # API routes
├── utils/        # Supabase client
└── db.js         # PostgreSQL connection

frontend/
├── src/
│   ├── components/  # Reusable UI (Card, Header, Footer)
│   ├── context/     # Auth state management
│   ├── pages/       # Application views
│   └── style.scss   # Global styles
```

- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

**Posts**

- `GET /api/posts` - Get all posts
- `GET /api/posts?cat=Category` - Filter by category
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post 🔒
- `PUT /api/posts/:id` - Update post 🔒
- `DELETE /api/posts/:id` - Delete post 🔒

**Upload**

- `POST /api/upload` - Upload image 🔒

🔒 = Requires authentication

## 📚 Key Libraries

**Backend:** express, mysql2, bcryptjs, jsonwebtoken, multer, cors  
**Frontend:** react, react-router-dom, axios, react-quill, sass, vite

## 👨‍💻 Author

**Bathrinath V** | [@bathrivijay05](https://github.com/bathrivijay05)
