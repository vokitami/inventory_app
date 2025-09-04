import { Link } from "react-router-dom";

export default function HOME() {
  
  return (
    <>
      <header className="p-4 bg-gray-800 text-white flex justify-between">
        <h1>Inventory APP HOME</h1>
        <Link to='/login'>Login</Link>
        <Link to='/register'>sin up</Link>
      </header>
    </>
  );
}