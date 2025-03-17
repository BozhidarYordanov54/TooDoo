import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../src/css/typography.css'
import '../src/css/reset.css'
import AuthProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
)
