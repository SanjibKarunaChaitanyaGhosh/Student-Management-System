import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";


function Students() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // Search
    const [search, setSearch] = useState("");

    // Filters
    const [courseFilter, setCourseFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");


    // =====================================
    // Fetch students
    // =====================================
    useEffect(() => {

        const fetchStudents = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api.get("/students");

                console.log(
                    "Students:",
                    response.data
                );


                // Support both:
                // { students: [...] }
                // and [...]
                if (Array.isArray(response.data)) {

                    setStudents(response.data);

                } else if (
                    Array.isArray(response.data.students)
                ) {

                    setStudents(response.data.students);

                } else {

                    setStudents([]);

                }

            } catch (error) {

                console.error(
                    "Fetch students error:",
                    error
                );


                setError(
                    error.response?.data?.message ||
                    "Failed to load students."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchStudents();

    }, []);


    // =====================================
    // Filter students
    // =====================================
    const filteredStudents = students.filter(
        (student) => {

            const searchText =
                search.toLowerCase().trim();


            const matchesSearch =
                student.fullName
                    ?.toLowerCase()
                    .includes(searchText) ||

                student.email
                    ?.toLowerCase()
                    .includes(searchText);


            const matchesCourse =
                courseFilter === "" ||
                student.course === courseFilter;


            const matchesStatus =
                statusFilter === "" ||
                student.status === statusFilter;


            return (
                matchesSearch &&
                matchesCourse &&
                matchesStatus
            );

        }
    );


    // =====================================
    // Delete student
    // =====================================
    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this student?"
        );


        if (!confirmed) {
            return;
        }


        try {

            await api.delete(`/students/${id}`);


            // Remove from current list
            setStudents(
                (previousStudents) =>
                    previousStudents.filter(
                        (student) =>
                            student._id !== id
                    )
            );


        } catch (error) {

            console.error(
                "Delete student error:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to delete student."
            );

        }

    };


    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar />


            <div className="flex-1">

                {/* Navbar */}
                <Navbar />


                <main className="p-6">


                    {/* Page Header */}
                    <div className="flex justify-between items-center mb-6">

                        <div>

                            <h1 className="text-3xl font-bold text-gray-800">
                                Students
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Manage all student records.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate("/students/add")
                            }
                            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
                        >
                            + Add Student
                        </button>

                    </div>


                    {/* Error */}
                    {error && (

                        <div className="mb-6 bg-red-100 text-red-700 p-4 rounded-lg">

                            {error}

                        </div>

                    )}


                    {/* Search and Filters */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


                            {/* Search */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Search
                                </label>

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search by name or email..."
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                            </div>


                            {/* Course */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course
                                </label>

                                <select
                                    value={courseFilter}
                                    onChange={(e) =>
                                        setCourseFilter(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >

                                    <option value="">
                                        All Courses
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


                            {/* Status */}
                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>

                                <select
                                    value={statusFilter}
                                    onChange={(e) =>
                                        setStatusFilter(e.target.value)
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >

                                    <option value="">
                                        All Status
                                    </option>

                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>


                    {/* Student Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                        <div className="p-6 border-b">

                            <h2 className="text-xl font-semibold">
                                Student List
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {filteredStudents.length} student(s) found
                            </p>

                        </div>


                        <div className="overflow-x-auto">

                            <table className="w-full">


                                {/* Header */}
                                <thead className="bg-gray-50">

                                    <tr>

                                        <th className="text-left px-6 py-4">
                                            Profile
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Name
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Email
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Phone
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Course
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Status
                                        </th>

                                        <th className="text-left px-6 py-4">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                {/* Body */}
                                <tbody>


                                    {loading ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-12 text-gray-500"
                                            >
                                                Loading students...
                                            </td>

                                        </tr>

                                    ) : filteredStudents.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-12 text-gray-500"
                                            >
                                                No students found.
                                            </td>

                                        </tr>

                                    ) : (

                                        filteredStudents.map(
                                            (student) => (

                                                <tr
                                                    key={student._id}
                                                    className="border-b hover:bg-gray-50"
                                                >


                                                    {/* Profile */}
                                                    <td className="px-6 py-4">

                                                        {student.profileImage ? (

                                                            <img
                                                                src={`http://localhost:5000/uploads/${student.profileImage}`}
                                                                alt={student.fullName}
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />

                                                        ) : (

                                                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">

                                                                {student.fullName
                                                                    ?.charAt(0)
                                                                    .toUpperCase()}

                                                            </div>

                                                        )}

                                                    </td>


                                                    {/* Name */}
                                                    <td className="px-6 py-4 font-medium">

                                                        {student.fullName}

                                                    </td>


                                                    {/* Email */}
                                                    <td className="px-6 py-4 text-gray-600">

                                                        {student.email}

                                                    </td>


                                                    {/* Phone */}
                                                    <td className="px-6 py-4 text-gray-600">

                                                        {student.phone}

                                                    </td>


                                                    {/* Course */}
                                                    <td className="px-6 py-4">

                                                        {student.course}

                                                    </td>


                                                    {/* Status */}
                                                    <td className="px-6 py-4">

                                                        <span
                                                            className={
                                                                student.status === "Active"
                                                                    ? "px-3 py-1 rounded-full text-sm bg-green-100 text-green-700"
                                                                    : "px-3 py-1 rounded-full text-sm bg-red-100 text-red-700"
                                                            }
                                                        >

                                                            {student.status}

                                                        </span>

                                                    </td>


                                                    {/* Actions */}
                                                    <td className="px-6 py-4">

                                                        <div className="flex gap-2">


                                                            {/* Edit */}
                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/students/edit/${student._id}`
                                                                    )
                                                                }
                                                                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                                                            >
                                                                Edit
                                                            </button>


                                                            {/* Delete */}
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        student._id
                                                                    )
                                                                }
                                                                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </main>

            </div>

        </div>

    );

}


export default Students;