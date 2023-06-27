import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Main from './pages/main/Main';
import ProductDetails from './pages/productDetails/ProductDetails';


function App(): ReactElement {
  
  return (
    <div className="main__page">
    <p className="main__title">Market</p>
      <Routes>
        <Route path='/' element={ <Main /> } />
        <Route path='/:id' element={ <ProductDetails />} />
      </Routes>
    </div>
  )
}

export default App