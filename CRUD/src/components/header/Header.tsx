import { ReactElement } from "react";
import logo from "./logo/logo.jpg";
import { Link } from "react-router-dom";
import { btnHome, divFather, h1Name, imgLogo } from "./css/className";

const Header= (): ReactElement => {
  return (
    <div className={ divFather }>
      <Link to={`/`}>
      <button className={ btnHome }>Home</button>
      </Link>
      <h1 className={ h1Name }>Market Crud</h1>
      <img className={ imgLogo }src={logo} alt="logotipo-de-computador" />
    </div>
  ) 
}

export default Header;
