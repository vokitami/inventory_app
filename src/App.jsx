import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './frontend/pages/home.jsx';  
import Login from './frontend/pages/login.jsx'; 
import Register from "./frontend/pages/register.jsx";
import AdminDashboard from "./frontend/pages/adminDashboard.jsx";
import UserDashboard from "./frontend/pages/userDashboard.jsx";
import ProtectedRoute from "./frontend/components/protectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirige la raíz al home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Página Home */}
        <Route path="/home" element={<Home />} />

        {/* Página Login */}
        <Route path="/login" element={<Login />} />

        {/* Puedes agregar otras rutas aquí */}
        <Route path="/register" element={<Register />} />

         {/* Solo usuarios con rol "user" */}
        <Route 
          path="/user-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Solo usuarios con rol "admin" */}
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
