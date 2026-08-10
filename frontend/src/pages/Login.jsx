import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            console.log("Login successful:", response.data);


            // Get JWT token
            const token = response.data.token;


            // Save JWT token
            localStorage.setItem("token", token);


            // Save admin information
            localStorage.setItem(
                "admin",
                JSON.stringify(response.data.admin)
            );


            // Go to dashboard
            navigate("/dashboard");

        } catch (error) {

            console.error("Login error:", error);

            if (error.response) {

                setError(
                    error.response.data.message || "Login failed"
                );

            } else {

                setError("Unable to connect to server");

            }
        }
    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold text-center">
                    Admin Login
                </h1>

                <p className="text-center text-gray-500 mt-2 mb-6">
                    Student Management System
                </p>


                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <div className="mb-4">

                        <label className="block mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@gmail.com"
                            className="w-full border px-4 py-3 rounded-lg"
                            required
                        />

                    </div>


                    <div className="mb-6">

                        <label className="block mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="admin123"
                            className="w-full border px-4 py-3 rounded-lg"
                            required
                        />

                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg cursor-pointer hover:bg-blue-700"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;