const express = require("express");

const {
    createStudent,
    getStudents,
    deleteStudent
} = require("../controllers/studentController");

const protect = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


// Add student
router.post(
    "/",
    protect,
    upload.single("profileImage"),
    createStudent
);


// Get all students
router.get(
    "/",
    protect,
    getStudents
);


// Delete student
router.delete(
    "/:id",
    protect,
    deleteStudent
);


module.exports = router;