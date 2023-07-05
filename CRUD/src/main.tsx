import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { store } from './app/store.ts';
import { apiSlice } from './features/apiSlice.ts';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    {/* <ApiProvider api={ apiSlice }> */}
    <Provider store={ store } >
        <App />
    </Provider>
    {/* </ApiProvider> */}
  </BrowserRouter>,
)
