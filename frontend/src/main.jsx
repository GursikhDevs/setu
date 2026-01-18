import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PageTransition from './components/ui/pageTransition.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PageTransition>
        <App />
      </PageTransition>
    </BrowserRouter>
  </StrictMode>,
)
