import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FilterProvider } from './context/filter'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  <FilterProvider>

    <App />
  </FilterProvider>

)
