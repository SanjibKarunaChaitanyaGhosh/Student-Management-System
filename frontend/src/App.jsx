import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public */}
                <Route
                    path="/"
                    element={<Login />}
                />


                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* Students */}
                <Route
                    path="/students"
                    element={
                        <ProtectedRoute>
                            <Students />
                        </ProtectedRoute>
                    }
                />


                {/* Add Student */}
                <Route
                    path="/students/add"
                    element={
                        <ProtectedRoute>
                            <AddStudent />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;