import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import TokenContextProvider from './Context/TokenContext.jsx'
import CartContextProvider from './Context/CartContext.jsx';
import {Provider} from "react-redux"
import {store} from "./Redux/store.js"


createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
<CartContextProvider>
 <TokenContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </TokenContextProvider>
  </CartContextProvider>
  </Provider>
  
 ,
)
