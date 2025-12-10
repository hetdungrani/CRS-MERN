import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminApp from './AdminApp.jsx' // Changed 'App' to 'AdminApp' for clarity, but the key is NO CURLY BRACES
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>,
)