import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { pkg } from '@carbon/ibm-products'
import '@carbon/ibm-products/css/index.min.css'
import './styles.scss'
import App from './App.tsx'

pkg.component.CreateSidePanel = true
pkg.component.SidePanel = true

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
