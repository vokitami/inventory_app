import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate(); // hook para navegación
  const name = localStorage.getItem('name');

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roleName');
    localStorage.removeItem('name');
    navigate('/login'); // redirige login
  }

  return (
    <>
      <header className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-2xl">Inventory APP <p className="text-[20px]">Hello <b>{name}</b></p></h1>
        <button
          onClick={handleLogOut}
          className="w-25 h-12 self-center text-center bg-red-500 p-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Logout
        </button>
      </header>
      <main>
        <h1 className="text-center text-3xl mt-5">WELCOME TO USER DASHBOARD</h1>
      </main>
      
    </>
  );
}
