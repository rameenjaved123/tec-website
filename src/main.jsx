import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { initErrorReporter } from './utils/errorReporter.js'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

initErrorReporter()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
