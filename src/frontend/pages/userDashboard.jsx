import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate(); // hook para navegación

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roleName');
    localStorage.removeItem('name');
    navigate('/login'); // redirige login
  }

  return (
    <>
      <header className="p-4 bg-gray-800 text-white flex justify-between">
        <h1>Inventory APP USER</h1>
        <button
          onClick={handleLogOut}
          className="bg-red-500 p-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </header>
    </>
  );
}
