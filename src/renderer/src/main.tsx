import '@coreui/coreui/dist/css/coreui.min.css'
import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from './components/ThemeProvider'
import { applyTheme, getInitialTheme } from './hooks/useTheme'
import App from './App'

applyTheme(getInitialTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
