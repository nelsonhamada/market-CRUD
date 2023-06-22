import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Main from './pages/main/Main';

function App(): ReactElement {
  
  return (
    <>
    <p className="main__title">Market</p>
      <Routes>
        <Route path='/' element={ <Main /> } />
      </Routes>
    </>
  )
}

export default App