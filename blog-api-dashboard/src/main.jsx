import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RoutesLayout from './routesLayout'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RoutesLayout />
  </StrictMode>,
)