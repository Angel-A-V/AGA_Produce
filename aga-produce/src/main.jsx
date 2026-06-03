// Find the div in html, turn on Reactm and load the website into it.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'hover.css/css/hover-min.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
