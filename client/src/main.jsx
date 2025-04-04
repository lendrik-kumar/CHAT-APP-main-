import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { SocketProvider } from './context/SocketContext'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SocketProvider>
    <App />
    <Toaster closeButton ></Toaster>
    </ SocketProvider>
  </BrowserRouter>
  
)
