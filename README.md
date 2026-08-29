# 🛒 E-Commerce MERN Application

A full-stack E-Commerce web application built using the MERN stack.

## 🌐 Live Demo

- 🖥️ **Frontend:** https://mvstore-beta.vercel.app/
- ⚙️ **Backend API:** https://e-commerce-mern-0lq5.onrender.com/

---

## ✨ Features

- 👤 User registration and authentication
- 🔐 JWT-based authentication
- 🛡️ Role-based access control
- 📦 Product CRUD operations
- 🛒 Shopping cart
- 🧾 Order management
- 👑 Admin functionality
- 🔗 RESTful APIs
- 📱 Responsive frontend
- ☁️ Cloud deployment

---

## 🛠️ Tech Stack

### 🎨 Frontend

- ⚛️ React.js
- 🟨 JavaScript
- 🌐 HTML5
- 🎨 CSS3

### ⚙️ Backend

- 🟢 Node.js
- 🚂 Express.js
- 🔗 REST APIs
- 🔐 JWT Authentication

### 🗄️ Database

- 🍃 MongoDB
- ☁️ MongoDB Atlas

### 🔧 Tools & Deployment

- 🐙 Git
- 🐙 GitHub
- 📮 Postman
- ▲ Vercel
- 🚀 Render

---

## 🏗️ Application Architecture

```text
                    👤 User
                      │
                      ▼
              ⚛️ React Frontend
                      │
                      │ HTTP Requests
                      ▼
                 🔗 REST API
                      │
                      ▼
            🟢 Node.js + Express.js
                      │
                      ▼
                 🍃 MongoDB
                      │
                      ▼
               ☁️ MongoDB Atlas
🔐 Authentication & Authorization

The application uses JWT-based authentication to secure users and protected API routes.

🔑 Authentication Flow
👤 User
   ↓
📝 Register / Login
   ↓
⚙️ Backend API
   ↓
🔑 JWT Token
   ↓
💻 Client
   ↓
🔐 Protected API Requests
🛡️ Role-Based Authorization
👤 Normal User
   ├── 🛍️ Browse Products
   ├── 🛒 Manage Cart
   └── 📦 Manage Orders

👑 Admin
   ├── 📦 Manage Products
   ├── 🧾 Manage Orders
   └── 🔐 Access Admin Routes
📡 REST API

The backend provides RESTful API endpoints for:

🔐 Authentication
👤 Users
📦 Products
🛒 Cart
🧾 Orders
👑 Admin operations
📊 HTTP Status Codes
Code	Status	Usage	Example
200	✅ OK	Request successful	User data fetched successfully
201	🎉 Created	New resource created	User registration successful
204	✅ No Content	Success with no response data	User deleted successfully
400	❌ Bad Request	Invalid client request	Missing required fields
401	🔐 Unauthorized	User not authenticated	No JWT token provided
403	🚫 Forbidden	User authenticated but not allowed	Normal user accessing admin route
404	🔎 Not Found	Resource doesn't exist	User ID not found
409	⚠️ Conflict	Duplicate resource exists	Email already registered
422	❌ Unprocessable Entity	Validation failed	Invalid email format
429	⏳ Too Many Requests	Rate limit exceeded	Too many login attempts
500	🔥 Internal Server Error	Server-side error	Database connection failed
502	🌐 Bad Gateway	Invalid response from another server	API gateway error
503	🛠️ Service Unavailable	Server temporarily unavailable	Maintenance mode
📂 Project Structure
E-Commerce/
│
├── 📁 backend/
│
├── 📁 frontend/
│
├── 📁 screenshots/
│   ├── 🖼️ admin.png
│   ├── 🖼️ carts.png
│   ├── 🖼️ home.png
│   ├── 🖼️ login.png
│   ├── 🖼️ product.png
│   └── 🖼️ shopping.png
│
├── 📄 .gitignore
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
2️⃣ Frontend Setup
cd frontend
npm install
npm run dev
3️⃣ Backend Setup

Open another terminal:

cd backend
npm install
npm run dev
🔑 Environment Variables

Create a .env file inside the backend directory.

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

⚠️ Never commit your .env file to GitHub.

Make sure .env is included in .gitignore.

🧪 API Testing

The backend APIs can be tested using Postman.

🔄 API Workflow
📝 Register
   ↓
🔐 Login
   ↓
🔑 Receive JWT
   ↓
📦 Access Protected APIs
   ↓
🛒 Perform Operations
   ↓
🧾 Manage Orders
🚀 Deployment
🎨 Frontend

Deployed using Vercel.

🔗 https://mvstore-beta.vercel.app/

⚙️ Backend

Deployed using Render.

🔗 https://e-commerce-mern-0lq5.onrender.com/

🗄️ Database

The application uses MongoDB Atlas as the cloud database.

📸 Screenshots
🏠 Home Page

🔐 Login Page

🛍️ Product Page

🛒 Shopping Page

🛒 Cart

👑 Admin Dashboard

🧠 What I Learned
⚛️ React.js frontend development
🟢 Node.js backend development
🚂 Express.js
🔗 REST API development
🍃 MongoDB
🔐 JWT authentication
🛡️ Role-based authorization
📡 API integration
🧪 API testing with Postman
🐛 Debugging and root-cause analysis
🌐 Full-stack application development
🚀 Application deployment
🎯 Future Improvements
💳 Payment gateway integration
🔍 Advanced product search
🎯 Product filtering and sorting
⭐ Product reviews and ratings
❤️ Wishlist functionality
📊 Advanced admin dashboard
📧 Email notifications
📱 Further mobile optimization
👨‍💻 Author
Vardhan Vendi

🎓 MCA Candidate

💻 Aspiring Software Developer

🚀 Java | MERN Stack | Python | Machine Learning

🔗 Connect With Me
🐙 GitHub: https://github.com/Vardhan-vendi


⭐ If you found this project useful, consider giving it a star!
