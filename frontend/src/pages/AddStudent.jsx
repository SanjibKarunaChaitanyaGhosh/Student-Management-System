import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";


function AddStudent() {

    const navigate = useNavigate();


    // Student form data
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        course: "",
        address: "",
        status: "Active"
    });


    // Profile image
    const [profileImage, setProfileImage] = useState(null);


    // Error message
    const [error, setError] = useState("");


    // ============================
    // Handle text/select inputs
    // ============================
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // ============================
    // Handle image upload
    // ============================
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }


        // Allowed image types
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png"
        ];


        if (!allowedTypes.includes(file.type)) {

            setError(
                "Only JPG, JPEG and PNG images are allowed."
            );

            setProfileImage(null);

            return;
        }


        // Maximum 2 MB
        if (file.size > 2 * 1024 * 1024) {

            setError(
                "Image size must be less than 2 MB."
            );

            setProfileImage(null);

            return;
        }


        setError("");
        setProfileImage(file);

    };


    // ============================
    // Submit form
    // ============================
    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        try {

            // Create FormData
            const data = new FormData();


            // Add student information
            data.append(
                "fullName",
                formData.fullName
            );

            data.append(
                "email",
                formData.email
            );

            data.append(
                "phone",
                formData.phone
            );

            data.append(
                "gender",
                formData.gender
            );

            data.append(
                "dateOfBirth",
                formData.dateOfBirth
            );

            data.append(
                "course",
                formData.course
            );

            data.append(
                "address",
                formData.address
            );

            data.append(
                "status",
                formData.status
            );


            // Add profile image
            if (profileImage) {

                data.append(
                    "profileImage",
                    profileImage
                );

            }


            // Send data to backend
            const response = await api.post(
                "/students",
                data
            );


            console.log(
                "Student created successfully:",
                response.data
            );


            // Redirect to student list
            navigate("/students");


        } catch (error) {

            console.error(
                "Add student error:",
                error
            );


            if (error.response) {

                setError(
                    error.response.data.message ||
                    "Failed to add student."
                );

            } else {

                setError(
                    "Unable to connect to server."
                );

            }

        }

    };


    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar />


            {/* Main content */}
            <div className="flex-1">

                {/* Navbar */}
                <Navbar />


                <main className="p-6">


                    {/* Page Header */}
                    <div className="mb-6">

                        <h1 className="text-3xl font-bold text-gray-800">
                            Add Student
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Add a new student to the system.
                        </p>

                    </div>


                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6">


                        {/* Error */}
                        {error && (

                            <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-lg">

                                {error}

                            </div>

                        )}


                        <form onSubmit={handleSubmit}>


                            {/* ============================
                                Profile Image
                            ============================ */}
                            <div className="mb-8">

                                <h2 className="text-lg font-semibold mb-4">
                                    Profile Image
                                </h2>


                                <div className="flex items-center gap-6">


                                    {/* Image preview */}
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">

                                        {profileImage ? (

                                            <img
                                                src={URL.createObjectURL(profileImage)}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />

                                        ) : (

                                            <span className="text-gray-400">
                                                No Image
                                            </span>

                                        )}

                                    </div>


                                    {/* File input */}
                                    <div>

                                        <input
                                            type="file"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={handleImageChange}
                                            className="block"
                                        />

                                        <p className="text-sm text-gray-500 mt-2">
                                            JPG, JPEG or PNG. Maximum 2 MB.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* ============================
                                Student Information
                            ============================ */}
                            <div>

                                <h2 className="text-lg font-semibold mb-4">
                                    Student Information
                                </h2>


                                {/* Full Name + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">


                                    {/* Full Name */}
                                    <div>

                                        <label className="block mb-2 font-medium">
                                            Full Name *
                                        </label>

                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter full name"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                    </div>


                                    {/* Email */}
                                    <div>

                                        <label className="block mb-2 font-medium">
                                            Email Address *
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="student@example.com"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                    </div>

                                </div>


                                {/* Phone + Gender */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">


                                    {/* Phone */}
                                    <div>

                                        <label className="block mb-2 font-medium">
                                            Phone Number *
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                    </div>


                                    {/* Gender */}
                                    <div>

                                        <label className="block mb-2 font-medium">
                                            Gender *
                                        </label>

                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >

                                            <option value="">
                                                Select Gender
                                            </option>

                                            <option value="Male">
                                                Male
                                            </option>

                                            <option value="Female">
                                                Female
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                {/* DOB + Course */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">


                                    {/* Date of Birth */}
                                    <div>

                                        <label className="block mb-2 font-medium">
                                            Date of Birth *
                                        </label>

                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                    </div>


                                    {/* Course */}
                                    <div>

                                        <label className="block mb-2 font-medium">
                                            Course *
                                        </label>

                                        <select
                                            name="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                            required
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >

                                            <option value="">
                                                Select Course
                                            </option>

                                            <option value="MCA">
                                                MCA
                                            </option>

                                            <option value="BCA">
                                                BCA
                                            </option>

                                            <option value="B.Tech">
                                                B.Tech
                                            </option>

                                            <option value="M.Tech">
                                                M.Tech
                                            </option>

                                            <option value="MBA">
                                                MBA
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                {/* Address */}
                                <div className="mb-6">

                                    <label className="block mb-2 font-medium">
                                        Address
                                    </label>

                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter student address"
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                </div>


                                {/* Status */}
                                <div className="mb-8">

                                    <label className="block mb-2 font-medium">
                                        Status
                                    </label>

                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >

                                        <option value="Active">
                                            Active
                                        </option>

                                        <option value="Inactive">
                                            Inactive
                                        </option>

                                    </select>

                                </div>


                                {/* Buttons */}
                                <div className="flex justify-end gap-4 border-t pt-6">


                                    {/* Cancel */}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/students")}
                                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>


                                    {/* Add Student */}
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Add Student
                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>

                </main>

            </div>

        </div>

    );
}


export default AddStudent;