import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Main from './pages/main/Main';

function App(): ReactElement {
  
  return (
    <>
    <p>Market</p>
      <Routes>
        <Route path='/' element={ <Main /> } />
      </Routes>
    </>
  )
}

export default App