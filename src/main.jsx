import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App";
import { HashRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./styles/globals.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
