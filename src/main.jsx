import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { Provider } from 'react-redux'
import { store } from './store/index.js'

   const rootElement = document.getElementById("root");
   console.log(rootElement); // This should log the <div> element or null
   createRoot(rootElement).render(
     <StrictMode>
       <Provider store={store}>
         <BrowserRouter>
           <ThemeProvider>
             <App />
           </ThemeProvider>
         </BrowserRouter>
       </Provider>
     </StrictMode>
   );
   
