# StayConnected – Full Stack News Blogging Platform

A modern, responsive news blogging platform built with React, Express.js, and MySQL.

## 🚀 Features

- JWT-based authentication with password hashing
- Rich text editor (React Quill)
- Category-based filtering (India, World, Business, Technology, Sports)
- Role-based access control
- Responsive design with SCSS
- Auto database table creation

## 📋 Prerequisites

- Node.js (v14+)
- MySQL (v5.7+)
- npm or yarn

## 🛠️ Setup

### 1. Clone Repository

```bash
git clone https://github.com/bathrivijay05/StayConnectedBlog.git
cd StayConnectedBlog
```

### 2. Database

```sql
CREATE DATABASE stayconnected;
```

### 3. Backend

```bash
cd backend
npm install
```

Create `.env` file:

```env
DB_HOSTNAME=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_DBNAME=stayconnected

FRONTEND_URL=http://localhost:5173
PORT=8080
JWT_SECRET=your_jwt_secret
```

Generate JWT secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

```bash
npm start
```

### 4. Frontend

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:8080/api
```

```bash
npm run dev
```

## 📁 Project Structure

```
backend/
├── controllers/  # Business logic
├── middleware/   # JWT verification
├── routes/       # API routes
└── db.js        # MySQL + auto table creation

frontend/
├── src/
│   ├── components/  # Reusable UI
│   ├── context/     # Auth state
│   └── pages/       # Route pages
└── public/upload/   # Image storage
```

## 🔌 API Endpoints

**Authentication**

- `POST /api/auth/signup` - Register
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

**Bathri Vijay** | [@bathrivijay05](https://github.com/bathrivijay05)
