const Student = require("../models/Student");

// ============================
// Add Student
// ============================
const createStudent = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            gender,
            dateOfBirth,
            course,
            address,
            status
        } = req.body;

        // Required fields
        if (
            !fullName ||
            !email ||
            !phone ||
            !gender ||
            !dateOfBirth ||
            !course
        ) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // Check duplicate email
        const existingStudent = await Student.findOne({
            email
        });

        if (existingStudent) {
            return res.status(400).json({
                message: "Student email already exists"
            });
        }

        // Image filename
        let profileImage = "";

        if (req.file) {
            profileImage = req.file.filename;
        }

        // Create student
        const student = await Student.create({
            profileImage,
            fullName,
            email,
            phone,
            gender,
            dateOfBirth,
            course,
            address,
            status: status || "Active"
        });

        res.status(201).json({
            message: "Student created successfully",
            student
        });

    } catch (error) {
        console.error("Create student error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ============================
// Get All Students
// ============================
const getStudents = async (req, res) => {
    try {
        const students = await Student.find()
            .sort({ createdAt: -1 });

        res.json({
            count: students.length,
            students
        });

    } catch (error) {
        console.error("Get students error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ============================
// Delete Student
// ============================
const deleteStudent = async (req, res) => {
    try {

        console.log("DELETE student request received");
        console.log("Student ID:", req.params.id);

        const { id } = req.params;

        // Find student
        const student = await Student.findById(id);

        if (!student) {
            console.log("Student not found");

            return res.status(404).json({
                message: "Student not found"
            });
        }

        console.log("Student found:", student.fullName);

        // Delete student
        await Student.findByIdAndDelete(id);

        console.log("Student deleted successfully");

        res.json({
            message: "Student deleted successfully"
        });

    } catch (error) {

        console.error("DELETE STUDENT ERROR:");
        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
};


// ============================
// Export Controllers
// ============================
module.exports = {
    createStudent,
    getStudents,
    deleteStudent
};