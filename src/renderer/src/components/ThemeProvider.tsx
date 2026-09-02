import { ReactNode } from 'react'
import { ThemeContext, useThemeController } from '../hooks/useTheme'

export function ThemeProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const themeController = useThemeController()
  return <ThemeContext.Provider value={themeController}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
