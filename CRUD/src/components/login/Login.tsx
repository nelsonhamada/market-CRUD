import { ReactElement } from "react";
import { useAppSelector } from '../../app/hooks';

const Login = (): ReactElement => {

  const name = useAppSelector((state) => state.name.name)
  const email = useAppSelector((state) => state.name.email)
  const isLogged = useAppSelector((state) => state.name.isLogged)
  

  return (
    <div className="main__login"> 
      {isLogged ?
        <>
          <p>{name}</p>
          <p>{email}</p> 
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
          
            />
          </label>
          <label>
              Email:
            <input type="text" />
          </label>
        </>
     } 
    </div>
  )
}

export default Login;
