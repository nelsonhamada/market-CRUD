import { ReactElement, useState } from "react";
import { useGetDetailsQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeReview, deleteReview, editReview } from "../../features/reviewSlice";
import { Map } from "./interface/interface";
import Header from "../../components/header/Header";
import { deleteBtn, divFather, editBtn, firstRadio, form, h1Review, h2Data, h3Data, imgData, labelRadio, main, pData, pEmailReview, pForm, pLoading, pTextReview, sendBtnAble, sendBtnDisabled, textArea } from "./css/classNames";
import styles from "./css/ProductDetails.module.css";

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
  
  let buttonClass: undefined | string;
  isAble? buttonClass = styles.sendBtnAble : buttonClass = styles.sendBtnDisabled;

  const verifyID: boolean =  idReview === pathname;
   

  return (
    <>
      <Header />
      <div className={ styles.mainBody }>
      <main className={ styles.main }>

    { 
      isLoading? <p className={ styles.pLoading }>Carregando...</p> :
      <div className={ styles.details}>
                
            {
              data?.pictures?.slice(0,1).map((picture: Map)=> 
              <img className={ styles.imgData } key= {picture.id} src={picture.url} alt={picture.title} />
              )}
          
            <h3 className={ styles.h3Data }>{`R$${data?.price}`}</h3>
            <p className={ styles.pData }>{data?.title}</p>
            <h2 className={ styles.h2Data }>Avaliações:</h2>
        </div>
    }   
        { isLogged && !isReviewed ? 
          <form className={ styles.form } data-testid="review-form">
            <p className={ styles.pForm }> Nota: </p>
            <input
              type="radio"
              id="one"
              name="rating"
              value="1"
              checked={review.rating === "1"}
              onChange={handleChange}
              className={ styles.firstRadio }
            />
            <label className={ styles.labelRadio } htmlFor="one"> 1 </label>
            <input
              type="radio"
              id="two"
              name="rating"
              value="2"
              checked={review.rating === "2"}
              onChange={handleChange}
            />
            <label className={ styles.labelRadio }  htmlFor="two"> 2 </label>
            <input
              type="radio"
              id="three"
              name="rating"
              value="3"
              checked={review.rating === "3"}
              onChange={handleChange}
            />
            <label className={ styles.labelRadio }  htmlFor="three"> 3 </label>
            <input
              type="radio"
              id="four"
              name="rating"
              value="4"
              checked={review.rating === "4"}
              onChange={handleChange}
            />
            <label className={ styles.labelRadio }  htmlFor="four"> 4 </label>
            <input
              type="radio"
              id="five"
              name="rating"
              value="5"
              checked={review.rating === "5"}
              onChange={handleChange}
            />
            <label  className={ styles.labelRadio }  htmlFor="five"> 5 </label>
            <div className={styles.reviewArea}>            
            <textarea
              placeholder="Deixe sua avaliação sobre o produto"
              name="text"
              value={ review.text }
              onChange={handleChange}
              maxLength={255}
              rows={10}
              className={ styles.textArea }
            />
            <button disabled={ !isAble } onClick={ handleClick } className={ buttonClass }> Enviar </button>
          </div>
          </form>
          :
          isLogged && isReviewed && verifyID? 
          <div>
            <h1 className={ styles.h1Review }> {`Nota: ${rating}/5`}</h1>
            <p className={ styles.pTextReview }> {text} </p>
            <p className={ styles.pEmailReview }>{`${email}`}</p>
            <button onClick={ handleEdit } className={ styles.editBtn }>Editar</button>
            <button onClick={ handleDelete } className={ styles.deleteBtn }>Excluir</button>
          </div> 
          : 
          isReviewed && verifyID?
          <div>
            <h1 className={ h1Review }> {`Nota: ${rating}/5`}</h1>
            <p className={ pTextReview }> {text} </p>
          </div> :
          <p> </p>
        }
        </main>
        <Login />
      </div>
    </>
  )
}

export default ProductDetails;
