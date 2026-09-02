import {
  useState,
  useEffect,
  createContext,
  useLayoutEffect,
  useCallback,
  useMemo,
  useContext,
  useSyncExternalStore
} from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'madness-monitor:theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

export function getSystemTheme(): Theme {
  if (window.matchMedia(DARK_QUERY).matches) {
    return 'dark'
  } else {
    return 'light'
  }
}

export function readStoredTheme(): Theme | null {
  try {
    const storedTheme = localStorage.getItem(STORAGE_KEY)
    return isTheme(storedTheme) ? storedTheme : null
  } catch (error) {
    console.error('Error reading stored theme:', error)
    return null
  }
}

function writeStoredTheme(theme: Theme | null): void {
  try {
    if (theme === null) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, theme)
    }
  } catch (error) {
    console.error('Error writing stored theme:', error)
  }
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-coreui-theme', theme)
}

export function getInitialTheme(): Theme {
  return readStoredTheme() ?? getSystemTheme()
}

export interface ThemeContextValue {
  theme: Theme
  isDarkMode: boolean
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

function subscribeToSystemTheme(onStoreChange: () => void): () => void {
  const media = window.matchMedia(DARK_QUERY)
  media.addEventListener('change', onStoreChange)
  return () => media.removeEventListener('change', onStoreChange)
}

export function useThemeController(): ThemeContextValue {
  const [override, setOverride] = useState<Theme | null>(() => readStoredTheme())
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme)
  const theme = override ?? systemTheme

  useLayoutEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    writeStoredTheme(override)
  }, [override])

  const toggleTheme = useCallback(() => {
    setOverride((prev) => ((prev ?? getSystemTheme()) === 'dark' ? 'light' : 'dark'))
  }, [])

  return useMemo(() => ({ theme, isDarkMode: theme === 'dark', toggleTheme }), [theme, toggleTheme])
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (context === null) throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
