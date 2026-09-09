import '@coreui/coreui/dist/css/coreui.min.css'
import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from './components/providers/ThemeProvider'
import { applyTheme, getInitialTheme } from './hooks/useTheme'
import App from './App'
import RankingsProvider from './components/providers/RankingsProvider'

applyTheme(getInitialTheme())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RankingsProvider>
        <App />
      </RankingsProvider>
    </ThemeProvider>
  </StrictMode>
)
