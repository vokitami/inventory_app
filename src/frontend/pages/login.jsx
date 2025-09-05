import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      const { token, roleName, name, message } = res.data;

      // Guardar info en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('roleName', roleName);
      localStorage.setItem('name', name);

      alert(message);
    
      // Redirigir según rol
      if(roleName === 'admin'){
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }

    } catch (err) {
      if (err.response && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert('Error en el servidor del login');
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <img
        src="src/frontend/img/mountain.jpeg"
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/96 to-transparent"></div>

      <header className="p-10 ml-10 text-3xl bg-transparent relative z-10 text-zinc-300/80">
        <Link to="/">Inventory APP</Link>
      </header>

      <main className="relative z-10 p-6 w-1/2">
        <form onSubmit={handleLogin} className="relative bg-transparent text-zinc-300/80 p-6 left-25 rounded w-[70%]">
          <h1 className="text-2xl text-center font-bold">LOGIN</h1>
          <p className="text-center mb-4">Start your new journey</p>

          <div className="flex gap-2 justify-center items-center">
            <p className="text-center">Don't have an account?</p>
            <Link to='/register' className="text-blue-300 hover:text-blue-400 hover:underline">Sign Up</Link>
          </div>
          
          <div className="mb-4">
            <label className="block mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="border outline-0 p-2 rounded w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="border outline-0 p-2 rounded w-full"
            />
          </div>

          <input type="submit" className="flex bg-blue-500 p-3 rounded-[7px] w-full hover:bg-blue-600 cursor-pointer my-8" value="Login" />
          <Link className="text-blue-300 hover:text-blue-400 hover:underline">Forgot Password?</Link>
        </form>
      </main>
    </div>
  );
}
