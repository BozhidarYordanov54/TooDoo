import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../src/css/typography.css'
import '../src/css/reset.css'

createRoot(document.getElementById('root')).render(
    <App />
)
