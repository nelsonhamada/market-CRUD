import { ReactElement } from "react";
import { useGetComputersQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { Link } from "react-router-dom";

const Main = (): ReactElement => {
  
  interface Result {
    id: string;
    thumbnail: string;
    title: string;
    price: number;
  }

  const {data, isLoading}  = useGetComputersQuery();
  
  return (
    <body className="bg-stone-800 min-h-screen flex text-indigo-400 bg-cover bg-fixed">
      <main className="bg-stone-700 grid grid-cols-3 place-items-center grid m-10 p-10 w-4/5 rounded-xl">
    { isLoading? <p className="flex content-center justify-center text-4xl font-black m-3 bg-stone-700 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">Carregando...</p> :
      data.results.slice(0,10).map((result: Result) => (
        <div className="grid bg-stone-800 w-5/6 h-96  m-5 rounded-lg  shadow-2xl" key={result.id}>
          <Link to={`/${result.id}`}>
            <span className="grid justify-center m-5">
              <img className="w-36" src={result.thumbnail} alt={result.title} />
            </span>
            <div className="grid place-self-end">
              <h3 className="text-2xl font-black m-3 bg-stone-700 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">{`R$${result.price}`}</h3>
              <p className="grid text-clip overflow-hidden m-5 bg-stone-700 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">{result.title}</p>
            </div>
          </Link>
        </div>
        )         
        )
      }
      </main>
      <Login />
    </body>
  )
}

export default Main;
