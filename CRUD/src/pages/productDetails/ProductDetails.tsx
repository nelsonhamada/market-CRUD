import { ReactElement } from "react";
import { useGetDetailsQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";


const ProductDetails = (): ReactElement => {
  
  interface Result {
    id: string;
    url: string;
    title: string;
    price: number;
  }

  const { isLogged } = useAppSelector((state) => state.login);
  const { id } = useParams()
  const {data, isLoading}  = useGetDetailsQuery(id);
  
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
          isLogged ? 
          <div className="bg-stone-700">
    <p> Nota: </p>
      <input type="radio" id="one" name="rating" value="1" />
       <label htmlFor="one"> 1 </label>
      <input type="radio" id="two" name="rating" value="2" />
        <label htmlFor="two"> 2 </label>
      <input type="radio" id="three" name="rating" value="3" />
        <label htmlFor="three"> 3 </label>
      <input type="radio" id="four" name="rating" value="4" />
        <label htmlFor="four"> 4 </label>
      <input type="radio" id="five" name="rating" value="5" />
        <label htmlFor="five"> 5 </label>
      <textarea placeholder="Deixe sua avaliação sobre o produto" maxLength={ 255 } rows={ 40 } />
      <button> Enviar </button>
    </div> :
    <p></p>
  } 
    </div>
    </>
  )
}

export default ProductDetails;
