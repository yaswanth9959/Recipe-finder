import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SearchProvider } from './context/SearchContext'   // ✅ import context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchProvider>  {/* ✅ Wrap App */}
      <App />
    </SearchProvider>
  </React.StrictMode>,
)
