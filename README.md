Student Management System

A full-stack Student Management System built using the MERN Stack.

The application allows an administrator to securely log in and manage student records through a professional dashboard.

🚀 Tech Stack
Frontend
React.js
React Router
Axios
Tailwind CSS
Backend
Node.js
Express.js
JWT
bcryptjs
Multer
Database
MongoDB Atlas
Mongoose
📌 Features
Authentication
Admin login
Email and password validation
Password hashing using bcrypt
JWT authentication
Protected API routes
Logout
Token stored in browser localStorage
Dashboard
Total Students
Active Students
Inactive Students
Recently Added Students
Student Management
Add Student
View Students
Delete Student
Edit Student
Search students
Filter by course
Filter by status
Student Information

Each student contains:

Profile Image
Full Name
Email
Phone Number
Gender
Date of Birth
Course
Address
Status
Image Upload
JPG
JPEG
PNG
Maximum size: 2 MB
Uploaded images stored in the backend uploads/ directory

### 📁 Project Structure
```bash
student-management/
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── studentController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Admin.js
│   │   └── Student.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   │
│   ├── uploads/
│   │
│   ├── .env
│   ├── createAdmin.js
│   ├── package.json
│   └── server.js
│
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Students.jsx
│   │   │   └── AddStudent.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
└── README.md
```

## 🛠️ Step-by-Step Development
### Step 1 — Create Project

* Create the main project folder:

```bash
🛠️ Step-by-Step Development
Step 1 — Create Project

Create the main project folder:
```

# Create backend:

```bash
mkdir backend
cd backend
```

* Initialize Node.js:
```bash
npm init -y
```

* Install the main backend packages:
```bash
npm install express mongoose dotenv cors
```

* Install Nodemon:
```bash
npm install --save-dev nodemon
```

### Step 2 — Backend Folder Structure

* Inside backend:
```bash
mkdir config models routes controllers middleware
```

* Create the server file:
```bash
touch server.js
```

* Create environment file:
```bash
touch .env
```

* The structure becomes:
```bash
backend/
│
├── config/
├── models/
├── routes/
├── controllers/
├── middleware/
├── .env
└── server.js
```

### Step 3 — Create Express Server

