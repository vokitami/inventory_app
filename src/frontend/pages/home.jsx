import { Link } from "react-router-dom";

export default function HOME() {
  
  return (
    <>
      <header className="p-4 bg-gray-800 text-white flex justify-between">
       <h1 className="text-2xl ml-5">Inventory APP <p className="text-[20px]">Home</p></h1>
        
        <div className="flex items-center gap-5 mr-10 text-[18px]">
           <Link to='/login' className="hover:text-blue-400 hover:underline cursor-pointer">Login</Link>
           <Link to='/register' className="hover:text-blue-400 hover:underline cursor-pointer">sing up</Link>
        </div>
        
      </header>
    </>
  );
}