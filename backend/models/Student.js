const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        profileImage: {
            type: String,
            default: ""
        },

        fullName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        },

        dateOfBirth: {
            type: Date,
            required: true
        },

        course: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;