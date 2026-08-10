const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();


// MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


// Uploaded images
app.use(
    "/uploads",
    express.static("uploads")
);


// Routes
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/students",
    studentRoutes
);


// Test route
app.get("/", (req, res) => {

    res.json({
        message: "Student Management API is running"
    });

});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on port ${PORT}`
    );

});