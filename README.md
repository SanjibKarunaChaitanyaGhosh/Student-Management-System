# Student-Management-System

### 1st step
```bash
mkdir student-management
cd student-management
```

```bash
mkdir student-management
cd student-management
```

```bash
npm init -y
```

```bash
npm install express mongoose dotenv cors
```

```bash
npm install --save-dev nodemon
```

### next

```bash
Package	Purpose
express	Backend server
mongoose	MongoDB ↔ Node.js
dotenv	Environment variables
cors	Frontend ↔ backend communication
nodemon	Automatically restart server
```

## Step 2 — Create Backend Structure

* Inside backend:
```bash
mkdir config models routes controllers middleware
``
```bash
touch server.js
touch .env
```


## Step 3 — Create Express Server
* backend/server.js

```bash
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Student Management API is running"
    });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

## Now modify package.json.
* find this 
```bash
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
}
```
* change this to 
```bash
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}
```
* start the server
```bash
npm run dev
```

### Backend working fine in http://localhost:5000/

# 🗄️ Step 4 — Now MongoDB
* upto step 6 completed database concetion

## step-7 statred 
 * created admin.js wihtin models
 * authController.js

 # Student-Management-System
