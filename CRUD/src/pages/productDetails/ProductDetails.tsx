import { ReactElement } from "react";
import { useGetDetailsQuery } from "../../features/apiSlice";
import Login from "../../components/login/Login";
import { useParams } from "react-router-dom";

const ProductDetails = (): ReactElement => {
  const { id } = useParams()
  const {data, isLoading}  = useGetDetailsQuery(id);
  
  return (
    <>
      <Login />
    { isLoading? <p>Carregando...</p> :
          <div className="productDetails__card">
            <div className="productDetails__pictures">           
            {data.pictures.slice(0,4).map((picture)=> 
              <img src={picture.url} alt={picture.id} />
              )}
              </div>
          <p>{data.title}</p>
          <p>{`R$${data.price}`}</p>
        </div>
    }
    </>
  )
}

export default ProductDetails;
