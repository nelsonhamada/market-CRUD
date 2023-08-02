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
    <>
      <Header />
      <Login />
      <main className="productDetails__main">

    { 
      isLoading? <p>Carregando...</p> :
        <div className="productDetails__card">
          <picture className="productDetails__pictures">           
            {
              data?.pictures?.slice(0,1).map((picture: Map)=> 
              <img key= {picture.id} src={picture.url} alt={picture.title} />
            )}
          </picture>
            <h3>{`R$${data?.price}`}</h3>
            <p>{data?.title}</p>
        </div>
    } 
      <h2>Avaliações:</h2>
        { isLogged && !isReviewed ? 

          <form className="bg-stone-700" data-testid="review-form">
            <p> Nota: </p>
            <input
              type="radio"
              id="one"
              name="rating"
              value="1"
              checked={review.rating === "1"}
              onChange={handleChange}
            />
            <label htmlFor="one"> 1 </label>
            <input
              type="radio"
              id="two"
              name="rating"
              value="2"
              checked={review.rating === "2"}
              onChange={handleChange}
            />
            <label htmlFor="two"> 2 </label>
            <input
              type="radio"
              id="three"
              name="rating"
              value="3"
              checked={review.rating === "3"}
              onChange={handleChange}
            />
            <label htmlFor="three"> 3 </label>
            <input
              type="radio"
              id="four"
              name="rating"
              value="4"
              checked={review.rating === "4"}
              onChange={handleChange}
            />
            <label htmlFor="four"> 4 </label>
            <input
              type="radio"
              id="five"
              name="rating"
              value="5"
              checked={review.rating === "5"}
              onChange={handleChange}
            />
            <label htmlFor="five"> 5 </label>
            <textarea
              placeholder="Deixe sua avaliação sobre o produto"
              name="text"
              value={ review.text }
              onChange={handleChange}
              maxLength={255}
              rows={4}
            />
            <button disabled={ !isAble } onClick={ handleClick }> Enviar </button>
          </form> :
          isLogged && isReviewed && verifyID? 
          <div>
            <h1> {`Nota: ${rating}/5`}</h1>
            <h2>Avaliação:</h2>
            <p> {text} </p>
            <p>{`${email}`}</p>
            <button onClick={ handleEdit }>Editar</button>
            <button onClick={ handleDelete }>Excluir</button>
          </div> : isReviewed && verifyID?
          <div>
            <h1> {`Nota: ${rating}/5`}</h1>
            <h2>Avaliação:</h2>
            <p> {text} </p>
          </div> :
          <h1> Esse produto não tem avaliações! </h1>
        } 
      </main>
    </>
  )
}

export default ProductDetails;
