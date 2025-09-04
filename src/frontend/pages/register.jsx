import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

export default function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();//evita que el formulario recargue la pagina al enviar.
    //console.log({name, email, password}); // verifica que estén llegando los valores
    try{
      const res = await axios.post('http://localhost:5000/register', {name,email,password});
      alert(res.data.message);
    }catch(err){
      alert(err.response.data.error);
    }
  };

    return(
       <div className="relative min-h-screen">
      {/* Imagen de fondo */}
      <img
        src="src/frontend/img/mountain.jpeg"
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Degradado gris */}
      <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-gray-900/96 to-transparent"></div>

      {/* Contenido */}
      <header className="flex p-10 mr-10 justify-end text-3xl bg-transparent relative z-10 text-zinc-300/80">
        <Link to={'/'}>Inventory APP</Link>
      </header>

      <main className="flex z-10 min-h-screen">
  {/* Espacio vacío a la izquierda para mostrar la imagen y degradado */}
  <div className="flex-1"></div>

  {/* Formulario a la derecha */}
  <form onSubmit={handleRegister} className="w-1/3 p-6 mr-25 rounded bg-transparent text-zinc-300/80 relative z-10">
    <h1 className="text-2xl text-center font-bold">REGISTER</h1>
    <p className="text-center mb-4">Start your new journey</p>

    <div className="flex gap-2 justify-center items-center mb-4">
      <p className="text-center">Already have an account?</p>
      <Link to='/login' className="text-blue-300 hover:text-blue-400 hover:underline">Login here</Link>
    </div>

    <div className="mb-4">
      <label className="block mb-1">Name</label>
      <input value={name} onChange={e => setName(e.target.value)} type="text" required className="border outline-0 p-2 rounded w-full" />
    </div>
    
    <div className="mb-4">
      <label className="block mb-1">E-mail</label>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" required className="border outline-0 p-2 rounded w-full" />
    </div>

    <div className="mb-4">
      <label className="block mb-1" htmlFor="password">Password</label>
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" required className="border outline-0 p-2 rounded w-full" />
    </div>

    <input type="submit" className="flex bg-blue-500 p-3 rounded-[7px] w-full hover:bg-blue-600 cursor-pointer my-8" />
  </form>
</main>

    </div>
    );
}
