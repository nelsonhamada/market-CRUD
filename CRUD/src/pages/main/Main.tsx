import { ReactElement } from "react";
import { useGetComputersQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { Link } from "react-router-dom";

const Main = (): ReactElement => {

  const {data, isLoading}  = useGetComputersQuery();
  
  return (
    <>
      <Login />
    { isLoading? <p>Carregando...</p> :
      data.results.slice(0,10).map((result) => (
        <div className="main__product__card" key={result.id}>
          <Link to={`/${result.id}`}>
            <img src={result.thumbnail} alt={result.title} />
            <p>{result.title}</p>              
            <p>{`R$${result.price}`}</p>
          </Link>
        </div>
        )         
      )
    }
    </>
  )
}

export default Main;
