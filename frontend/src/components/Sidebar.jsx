import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        navigate("/");
    };

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">

            {/* Logo */}
            <div className="p-6 border-b border-slate-700">

                <h1 className="text-xl font-bold">
                    Student Management
                </h1>

                <p className="text-sm text-slate-400 mt-1">
                    Admin Panel
                </p>

            </div>


            {/* Navigation */}
            <nav className="flex-1 p-4">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg mb-2 ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-800"
                        }`
                    }
                >
                    Dashboard
                </NavLink>


                <NavLink
                    to="/students"
                    className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg mb-2 ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-800"
                        }`
                    }
                >
                    Students
                </NavLink>


                <NavLink
                    to="/students/add"
                    className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg mb-2 ${
                            isActive
                                ? "bg-blue-600"
                                : "hover:bg-slate-800"
                        }`
                    }
                >
                    Add Student
                </NavLink>

            </nav>


            {/* Logout */}
            <div className="p-4 border-t border-slate-700">

                <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;