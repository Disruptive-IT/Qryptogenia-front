import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/style/index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './i18n.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
