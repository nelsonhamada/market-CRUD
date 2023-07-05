import { ReactElement } from "react";
import { useGetComputersQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { Link } from "react-router-dom";
import './main.css';

const Main = (): ReactElement => {
  
  interface Result {
    id: string;
    thumbnail: string;
    title: string;
    price: number;
  }

  const {data, isLoading}  = useGetComputersQuery();
  
  return (
    <div className="main__page">
      <Login />
      <div className="main__products">
    { isLoading? <p>Carregando...</p> :
      data.results.slice(0,10).map((result: Result) => (
        <div className="main__product__card" key={result.id}>
          <Link to={`/${result.id}`}>
            <img className="main__product__card__img" src={result.thumbnail} alt={result.title} />
            <h3>{`R$${result.price}`}</h3>
            <p>{result.title}</p>              
          </Link>
        </div>
        )         
      )
    }
      </div>
    </div>
  )
}

export default Main;
