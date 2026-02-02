import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext' // <--- NUEVO IMPORT
import { ReservasProvider } from './context/ReservasContext';
import { ThemeProvider } from './context/ThemeContext';
import { CarritoProvider } from './context/CarritoContext' // <--- NUEVO IMPORT
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <ReservasProvider>
          <CarritoProvider> {/* <--- NUEVO */}
            <ThemeProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ThemeProvider>
          </CarritoProvider>
        </ReservasProvider>
      </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>,
)