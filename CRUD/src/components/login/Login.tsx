import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeName, logout } from "../../features/loginSlice";

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

  return (
    <aside className="bg-stone-700 flex text-center h-80 rounded-xl p-5 m-10"> 
      {isLogged ?
        <fieldset>
          <p>{name}</p>
          <p>{email}</p>
          <button
            onClick={ handleClick }
            data-testid="logout-btn"
            className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-700 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Logout
          </button> 
        </fieldset> 
      :
        <form>
          <h3 className="font-bold m-5">
            Efetue o Login para avaliar um produto.
          </h3>
          <fieldset>
            <input
              data-testid="input-name"
              type="text"
              name="name"
              onChange={ handleChange }
              placeholder="Nome"
              className=" mx-5 rounded-lg"
            />
            <br />
          </fieldset>
          <fieldset>
            <input 
              data-testid="input-email"
              type="text"
              name="email"
              // value={ props.email }
              onChange={ handleChange }
              placeholder="Email"
              className="m-5 rounded-lg"
            />
            <br />
          </fieldset>
          <button
            onClick={ handleClick }
            data-testid="login-btn"
            disabled={ !isAble }
            className="bg-gradient-to-r from-purple-800 to-pink-700 hover:from-pink-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
     } 
    </aside>
  )
}

export default Login;
