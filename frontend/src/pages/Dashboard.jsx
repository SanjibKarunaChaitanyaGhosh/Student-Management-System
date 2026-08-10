import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";


function Dashboard() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ============================
    // Get students from backend
    // ============================
    useEffect(() => {

        const fetchStudents = async () => {

            try {

                setLoading(true);

                const response = await api.get("/students");

                console.log(
                    "Students API response:",
                    response.data
                );


                // Backend may return:
                // { students: [...] }
                //
                // or directly:
                // [...]

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
                    "Get students error:",
                    error
                );


                if (error.response) {

                    setError(
                        error.response.data.message ||
                        "Failed to load students."
                    );

                } else {

                    setError(
                        "Unable to connect to server."
                    );

                }

            } finally {

                setLoading(false);

            }

        };


        fetchStudents();

    }, []);


    // ============================
    // Statistics
    // ============================

    const totalStudents = students.length;


    const activeStudents = students.filter(
        (student) =>
            student.status === "Active"
    ).length;


    const inactiveStudents = students.filter(
        (student) =>
            student.status === "Inactive"
    ).length;


    // Latest 5 students
    const recentStudents = [...students]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, 5);


    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <Sidebar />


            {/* Main Area */}
            <div className="flex-1">

                {/* Navbar */}
                <Navbar />


                <main className="p-6">


                    {/* Welcome */}
                    <div className="mb-6">

                        <h1 className="text-3xl font-bold text-gray-800">
                            Dashboard
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Welcome back! Here's what's happening with your students.
                        </p>

                    </div>


                    {/* Error */}
                    {error && (

                        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">

                            {error}

                        </div>

                    )}


                    {/* Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


                        {/* Total */}
                        <div className="bg-white rounded-xl shadow-sm p-6">

                            <p className="text-gray-500">
                                Total Students
                            </p>

                            <h2 className="text-3xl font-bold mt-2">
                                {loading ? "..." : totalStudents}
                            </h2>

                        </div>


                        {/* Active */}
                        <div className="bg-white rounded-xl shadow-sm p-6">

                            <p className="text-gray-500">
                                Active Students
                            </p>

                            <h2 className="text-3xl font-bold text-green-600 mt-2">
                                {loading ? "..." : activeStudents}
                            </h2>

                        </div>


                        {/* Inactive */}
                        <div className="bg-white rounded-xl shadow-sm p-6">

                            <p className="text-gray-500">
                                Inactive Students
                            </p>

                            <h2 className="text-3xl font-bold text-red-600 mt-2">
                                {loading ? "..." : inactiveStudents}
                            </h2>

                        </div>

                    </div>


                    {/* Recent Students */}
                    <div className="bg-white rounded-xl shadow-sm mt-6 p-6">

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-xl font-semibold">
                                Recently Added Students
                            </h2>


                            <button
                                onClick={() => navigate("/students")}
                                className="text-blue-600 hover:underline"
                            >
                                View All
                            </button>

                        </div>


                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-3">
                                            Name
                                        </th>

                                        <th className="text-left py-3">
                                            Email
                                        </th>

                                        <th className="text-left py-3">
                                            Course
                                        </th>

                                        <th className="text-left py-3">
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>


                                    {loading ? (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center py-10 text-gray-500"
                                            >
                                                Loading students...
                                            </td>

                                        </tr>

                                    ) : recentStudents.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center py-10 text-gray-500"
                                            >
                                                No students found
                                            </td>

                                        </tr>

                                    ) : (

                                        recentStudents.map(
                                            (student) => (

                                                <tr
                                                    key={student._id}
                                                    className="border-b"
                                                >

                                                    <td className="py-3">
                                                        {student.fullName}
                                                    </td>

                                                    <td className="py-3">
                                                        {student.email}
                                                    </td>

                                                    <td className="py-3">
                                                        {student.course}
                                                    </td>

                                                    <td className="py-3">

                                                        <span
                                                            className={
                                                                student.status === "Active"
                                                                    ? "text-green-600 font-medium"
                                                                    : "text-red-600 font-medium"
                                                            }
                                                        >
                                                            {student.status}
                                                        </span>

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


export default Dashboard;