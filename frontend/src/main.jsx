import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../src/css/typography.css'
import '../src/css/reset.css'
import AuthProvider from './components/auth/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
