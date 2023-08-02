import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeName, logout } from "../../features/loginSlice";
import userIcon from "./img/user.png";
import { btnAbleClass, btnDisableClass, divFather, emailUser, fieldsetUser, h3Form, imgUser, inputEmail, inputName, logoutBtn, nameUser } from "./css/className";

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
  isAble ? button = btnAbleClass : button = btnDisableClass;

  return (
    <div className={ divFather }> 
      { isLogged ?
        <fieldset className={ fieldsetUser }>
          <img className={ imgUser } src={ userIcon } alt="Ícone de usuário."/>
          <p className={ nameUser }>{name}</p>
          <p className={ emailUser }>{email}</p>
          <button
            onClick={ handleClick }
            data-testid="logout-btn"
            className={ logoutBtn }
          >
            Logout
          </button> 
        </fieldset> 
      :
        <form>
          <h3 className={ h3Form }>
            Efetue o Login para avaliar um produto.
          </h3>
          <fieldset>
            <input
              data-testid="input-name"
              type="text"
              name="name"
              onChange={ handleChange }
              placeholder="Nome"
              className={ inputName }
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
              className={ inputEmail }
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
