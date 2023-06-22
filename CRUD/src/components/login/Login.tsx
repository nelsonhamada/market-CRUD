import { ReactElement, useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { changeName, logout } from "../../features/loginSlice";
import './Login.css';

const Login = (props: {[key: string]:string}): ReactElement => {

  const dispatch = useAppDispatch();
  const { name, email, isLogged } = useAppSelector((state) => state.login);
  const [login, setLogin] = useState<{[key: string]: string}>({});
  
  const handleChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
    setLogin({
      ...login,
      [name]: value,
    })
  }

  const handleClick = () => {
    !isLogged? dispatch(changeName(login)) : dispatch(logout())
  }

  return (
    <div className="main__login"> 
      {isLogged ?
        <>
          <p>{name}</p>
          <p>{email}</p>
          <button onClick={ handleClick } data-test-id="logout-btn">Logout</button> 
        </> 
      :
        <>
          <h3 className="main__login__title">
            Efetue o Login para avaliar um produto.
          </h3>
          <label>
              Nome:
            <input
            type="text"
            name="name"
            value= { props.name }
            onChange={ handleChange }
            />
          </label>
          <label>
              Email:
            <input 
            type="text"
            name="email"
            value={ props.email }
            onChange={ handleChange }
            />
          </label>
          <button onClick={ handleClick } data-testid="login-btn">Login</button>
        </>
     } 
    </div>
  )
}

export default Login;
