import { ReactElement, useState } from "react";
import { useGetDetailsQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeReview, deleteReview, editReview } from "../../features/reviewSlice";


const ProductDetails = (): ReactElement => {
  
  interface Result {
    id: string;
    url: string;
    title: string;
    price: number;
  }

  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.login);
  const { text, rating, isReviewed } = useAppSelector((state) => state.review);
  const { id } = useParams()
  const { name, email } = useAppSelector((state) => state.login);
  const { data, isLoading }  = useGetDetailsQuery(id);
  const [review, setReview] = useState<{[key: string]: string}>({})
  const [isAble, setAble] = useState<boolean>(false);

  const handleChange = ({ target: { name, value } }: { target: { name: string, value: string } }): void => {
    setReview({
      ...review,
      [name]: value,
      user: email,
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

  const verifyUser = review.user === email;

  return (
    <>
      <Login />
      <div className="productDetails__main">

    { isLoading? <p>Carregando...</p> :
          <div className="productDetails__card">
            <div className="productDetails__pictures">           
            {data.pictures.slice(0,1).map((picture: Result)=> 
              <img src={picture.url} alt={picture.id} />
              )}
              </div>
          <h3>{`R$${data.price}`}</h3>
          <p>{data.title}</p>
        </div>
    } <h3>Avaliações:</h3>
        {
          isLogged && !isReviewed ? 
          <div className="bg-stone-700">
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
    </div> :
    isLogged && isReviewed && verifyUser ?
    <div>
      <h1> {`Nota: ${rating}/5`}</h1>
      <h2>Avaliação:</h2>
      <p> {text} </p>
      <p>{`${review.user}`}</p>
      <button onClick={ handleEdit }>Editar</button>
      <button onClick={ handleDelete }>Excluir</button>
    </div> : isReviewed?
    <div>
      <h1> {`Nota: ${rating}/5`}</h1>
      <h2>Avaliação:</h2>
      <p> {text} </p>
      <p>{`${review.user}`}</p>
    </div> :
    <h1> Esse produto não tem avaliações! </h1>
  } 
    </div>
    </>
  )
}

export default ProductDetails;
