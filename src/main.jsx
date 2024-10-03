import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/index.css'
import App from './app'
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
   <BrowserRouter>
      <App />
    </BrowserRouter>
  

  </React.StrictMode>,
)
