const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const Admin = require("./models/Admin");


const createAdmin = async () => {

    try {

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");


        // Admin information
        const name = "Administrator";
        const email = "admin@gmail.com";
        const password = "admin123";


        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {

            console.log("Admin already exists");

            process.exit();
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create admin
        const admin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });


        console.log("Admin created successfully");
        console.log("Email:", admin.email);
        console.log("Password:", password);


        process.exit();

    } catch (error) {

        console.error("Error:", error.message);

        process.exit(1);
    }
};


createAdmin();