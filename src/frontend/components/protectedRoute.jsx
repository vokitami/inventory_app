import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  // Obtener el token y rol desde localStorage
  const token = localStorage.getItem('token');
  const roleName = localStorage.getItem('roleName');

  // Si no hay token, no está logeado → redirige a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no está permitido para esta ruta → redirige a login o a su dashboard
  if (!allowedRoles.includes(roleName)) {
    return <Navigate to="/login" replace />;
  }

  // Usuario logeado y con rol permitido → muestra la página
  return children;
}
