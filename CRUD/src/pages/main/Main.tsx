import { ReactElement } from "react";
import { useGetComputersQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { divFather, main, pLoading, divData, spanData, imgData, sectionData, h3Data, pData } from "./css/classNames";

const Main = (): ReactElement => {
  
  const { data, isLoading }  = useGetComputersQuery();
  
  return (
    <>
      <Header />
      <div className={ divFather }>
        <main className={ main }>
      { 
        isLoading ?
        <p className={ pLoading }>
            Carregando...
          </p>
          :
          data?.results.slice(0,10).map((result) => (
            <div className={ divData } key={result.id}>
                <Link to={`/${result.id}`}>
                  <span className={ spanData }>
                    <img className={ imgData } src={result.thumbnail} alt={result.title} />
                  </span>
                  <section className={ sectionData }>
                    <h3 className={ h3Data }>{`R$${result.price.toFixed(2)}`}</h3>
                    <p className={ pData }>{result.title}</p>
                  </section>
                </Link>
              </div>
            )         
          )
        }
        </main>
        <Login />
      </div>
    </>
  )
}

export default Main;
