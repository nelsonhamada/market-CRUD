import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeName, logout } from "../../features/loginSlice";
import userIcon from "./img/user.png";
import style from './css/Login.module.css';

const Login = (): ReactElement => {

  const dispatch = useAppDispatch();
  const { name, email, isLogged } = useAppSelector((state) => state.login);
  const [login, setLogin] = useState<{[key: string]: string}>({});
  const [isAble, setAble] = useState<boolean>(false);
  
  const handleChange = ({ target: { name, value } }: { target: { name: string, value: string } }): void => {
    setLogin({
      ...login,
      [name]: value,
    }), handleValidate()
  }

  const handleClick = (): void => {
    !isLogged? dispatch(changeName(login)) : dispatch(logout()), setLogin({}), setAble(false);
  }

  const handleValidate = (): void => {
    const validateEmail: boolean = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(login.email);
    const validations: [string, boolean] = [login.name , validateEmail];
    const validate: boolean = validations.every((v) => v);
    setAble(validate);
  }
  

  let button: undefined | string;
  isAble ? button = style.btnAbleClass : button = style.btnDisableClass;

  return (
    <div className={ style.main }> 
      { isLogged ?
        <fieldset className={ style.fieldsetUser }>
          <img className={ style.imgUser } src={ userIcon } alt="Ícone de usuário."/>
          <p className={ style.nameUser }>{name}</p>
          <p className={ style.emailUser }>{email}</p>
          <button
            onClick={ handleClick }
            data-testid="logout-btn"
            className={ style.logoutBtn }
          >
            Logout
          </button> 
        </fieldset> 
      :
        <form>
          <h3 className={ style.h3Form }>
            Efetue o Login para avaliar um produto.
          </h3>
          <fieldset>
            <input
              data-testid="input-name"
              type="text"
              name="name"
              onChange={ handleChange }
              placeholder="Nome"
              className={ style.inputName }
            />
            <br />
          </fieldset>
          <fieldset>
            <input 
              data-testid="input-email"
              type="text"
              name="email"
              onChange={ handleChange }
              placeholder="Email"
              className={ style.inputEmail }
            />
            <br />
          </fieldset>
          <button
            onClick={ handleClick }
            data-testid="login-btn"
            disabled={ !isAble }
            className={ button }
          >
            Login
          </button>
        </form>
     } 
    </div>
  )
}

export default Login;
