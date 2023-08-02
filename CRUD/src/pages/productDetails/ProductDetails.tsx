import { ReactElement, useState } from "react";
import { useGetDetailsQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeReview, deleteReview, editReview } from "../../features/reviewSlice";
import { Map } from "./interface/interface";
import Header from "../../components/header/Header";


const ProductDetails = (): ReactElement => {

  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams()
  const { pathname } = location;
  const { data, isLoading }  = useGetDetailsQuery(id);
  const { isLogged, email } = useAppSelector((state) => state.login);
  const { text, rating,idReview , isReviewed } = useAppSelector((state) => state.review);
  const [review, setReview] = useState<{[key: string]: string}>({})
  const [isAble, setAble] = useState<boolean>(false);


  const handleChange = ({ target: { name, value } }: { target: { name: string, value: string } }): void => {
    setReview({
      ...review,
      [name]: value,
      user: email,
      idReview: pathname,
    }), handleValidate()
  }

  const handleValidate = (): void => {
    const validating = [review.text, review.rating].every((value) => value);
    setAble(validating);
  }
  
  const handleClick = ():void => {
    dispatch(changeReview(review));
  }

  const handleDelete = (): void => {
    setReview({})
    dispatch(deleteReview());
  }

  const handleEdit = (): void => {
    dispatch(editReview())    
  }

  const verifyID: boolean =  idReview === pathname;
   

  return (
    <div className="">
      <Header />
      <div className="bg-stone-800 flex min-h-screen text-indigo-400 bg-cover bg-fixed">
      <main className="bg-stone-700 flex-col m-10 p-10 w-4/5 rounded-xl">

    { 
      isLoading? <p className="text-4xl font-black m-3 bg-stone-700 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-blue-500 to-purple-500 self-center mx-auto">Carregando...</p> :
      <div className="">
                
            {
              data?.pictures?.slice(0,1).map((picture: Map)=> 
              <img className="opacity-80 rounded-xl" key= {picture.id} src={picture.url} alt={picture.title} />
              )}
          
            <h3 className="text-2xl font-black m-2 mt-6  justify-self-end bg-stone-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-pink-500 to-purple-500">{`R$${data?.price}`}</h3>
            <p className="grid text-clip overflow-hidden m-2 text-white">{data?.title}</p>
            <h2 className="text-2xl  mt-5 mb-3 bg-stone-700 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-blue-500 to-purple-500">Avaliações:</h2>
        </div>
    }   
        { isLogged && !isReviewed ? 
          <form className="w-64 flex-col" data-testid="review-form">
            <p className="text-xl mb-3"> Nota: </p>
            <input
              type="radio"
              id="one"
              name="rating"
              value="1"
              checked={review.rating === "1"}
              onChange={handleChange}
              className="mb-3"
            />
            <label className="m-1 mr-3" htmlFor="one"> 1 </label>
            <input
              type="radio"
              id="two"
              name="rating"
              value="2"
              checked={review.rating === "2"}
              onChange={handleChange}
            />
            <label className="m-1 mr-3" htmlFor="two"> 2 </label>
            <input
              type="radio"
              id="three"
              name="rating"
              value="3"
              checked={review.rating === "3"}
              onChange={handleChange}
            />
            <label className="m-1 mr-3" htmlFor="three"> 3 </label>
            <input
              type="radio"
              id="four"
              name="rating"
              value="4"
              checked={review.rating === "4"}
              onChange={handleChange}
            />
            <label className="m-1 mr-3" htmlFor="four"> 4 </label>
            <input
              type="radio"
              id="five"
              name="rating"
              value="5"
              checked={review.rating === "5"}
              onChange={handleChange}
            />
            <label  className="m-1 mr-3" htmlFor="five"> 5 </label>
            <textarea
              placeholder="Deixe sua avaliação sobre o produto"
              name="text"
              value={ review.text }
              onChange={handleChange}
              maxLength={255}
              rows={10}
              className="w-64 bg-stone-600"
            />
            <button disabled={ !isAble } onClick={ handleClick } className="bg-gradient-to-r from-purple-800 to-pink-700 hover:from-pink-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out mt-4 justify-self-end"> Enviar </button>
          </form>
          :
          isLogged && isReviewed && verifyID? 
          <div>
            <h1 className="text-2xl m-2 font-black"> {`Nota: ${rating}/5`}</h1>
            <p className="text-xl m-2 text-white"> {text} </p>
            <p className="text-lg font-black m-2">{`${email}`}</p>
            <button onClick={ handleEdit } className="bg-gradient-to-r from-blue-800 to-purple-700 hover:from-pink-700 hover:to-blue-800 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out m-2 mt-4">Editar</button>
            <button onClick={ handleDelete } className="bg-gradient-to-r from-red-800 to-pink-700 hover:from-pink-700 hover:to-red-800 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out mt-4">Excluir</button>
          </div> 
          : 
          isReviewed && verifyID?
          <div>
            <h1 className="text-2xl m-2 font-black"> {`Nota: ${rating}/5`}</h1>
            <p className="text-xl m-2 text-white"> {text} </p>
          </div> :
          <p> </p>
        }
        </main>
        <Login />
      </div>
    </div>
  )
}

export default ProductDetails;
