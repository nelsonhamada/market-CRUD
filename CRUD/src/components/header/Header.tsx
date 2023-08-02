import { ReactElement } from "react";
import logo from "./logo/logo.jpg";
import { Link } from "react-router-dom";

const Header= (): ReactElement => {
  return (
    <div className="bg-stone-700 flex justify-between items-center w-full">
      <img className="w-16 m-3 rounded-xl" src={logo} alt="logotipo-de-computador" />
      <h1 className="text-4xl font-black m-3 bg-stone-700 bg-clip-text text-transparent     bg-gradient-to-r from-green-500 via-pink-500 to-purple-500">Market Crude</h1>
      <Link to={`/`}>
      <button className="m-5 font-black text-white opacity-80">Home</button>
      </Link>
    </div>
  ) 
}

export default Header;
