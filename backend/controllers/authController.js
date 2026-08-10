const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check if email and password were provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        // Find admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Compare password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Create JWT
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // Send response
        res.json({
            message: "Login successful",
            token: token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }
};

module.exports = {
    loginAdmin
};