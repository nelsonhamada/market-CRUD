import { ReactElement } from "react";
import { useGetComputersQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";

const Main = (): ReactElement => {
  
  const {data, isLoading}  = useGetComputersQuery();
  
  return (
    <>
      <Header />
      <div className="bg-stone-800 flex min-h-screen text-indigo-400 bg-cover bg-fixed flex">
        <main className="bg-stone-700 grid grid-cols-3 place-items-center grid m-10 p-10 w-4/5 rounded-xl">
      { 
        isLoading ? 
        <p className="text-4xl font-black m-3 bg-stone-700 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500 ">
            Carregando...
          </p> 
          :
          data?.results.slice(0,10).map((result) => (
            <div className="grid bg-stone-800 w-5/6 h-96 m-5 rounded-lg shadow-2xl text-ellipsis overflow-hidden" key={result.id}>
                <Link to={`/${result.id}`}>
                  <span className="grid justify-center m-5">
                    <img className="w-36 opacity-80" src={result.thumbnail} alt={result.title} />
                  </span>
                  <section className="grid">
                    <h3 className="text-2xl font-black m-3 text-white justify-self-end">{`R$${result.price.toFixed(2)}`}</h3>
                    <p className="text-clip overflow-hidden m-5 text-white">{result.title}</p>
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
