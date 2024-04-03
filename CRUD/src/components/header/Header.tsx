import { ReactElement } from "react";
import logo from "./logo/logo.jpg";
import { Link } from "react-router-dom";
import { btnHome, divFather, h1Name, imgLogo } from "./css/className";
import styles from "./css/Header.module.css";

const Header= (): ReactElement => {
  return (
    <div className={ styles.main }>
      <Link to={`/`}>
      <button className={ styles.btnHome }>Home</button>
      </Link>
      <h1 className={ styles.h1Name }>Market Crud</h1>
      <img className={ styles.imgLogo }src={logo} alt="logotipo-de-computador" />
    </div>
  ) 
}

export default Header;
