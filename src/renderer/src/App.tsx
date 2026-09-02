import Home from './components/pages/Home'
import APRankings from './components/pages/APRankings'
import RankingsChart from './components/pages/RankingsChart'
import Scorecards from './components/pages/Scorecards'
import Tournaments from './components/pages/Tournaments'
import { useState } from 'react'
import { CContainer, CNavbar, CNavbarNav, CNavItem, CNavLink, CButton } from '@coreui/react'
import { useTheme } from './hooks/useTheme'

const PAGES = {
  home: <Home></Home>,
  aprankings: <APRankings></APRankings>,
  rankingschart: <RankingsChart></RankingsChart>,
  scorecards: <Scorecards></Scorecards>,
  tournaments: <Tournaments></Tournaments>
}

function App(): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState('home')
  const { theme, isDarkMode, toggleTheme } = useTheme()

  return (
    <>
      <CNavbar className="app-navbar" colorScheme={theme} expand>
        <CContainer fluid>
          <CNavbarNav>
            <CNavItem>
              <CNavLink onClick={() => setCurrentPage('home')} active={currentPage === 'home'}>
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => setCurrentPage('aprankings')}
                active={currentPage === 'aprankings'}
              >
                AP Rankings
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => setCurrentPage('rankingschart')}
                active={currentPage === 'rankingschart'}
              >
                Rankins Chart
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => setCurrentPage('scorecards')}
                active={currentPage === 'scorecards'}
              >
                Scorecards
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                onClick={() => setCurrentPage('tournaments')}
                active={currentPage === 'tournaments'}
              >
                Tournaments
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
          <CButton
            className="ms-auto"
            color="secondary"
            variant="ghost"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            aria-pressed={isDarkMode}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span aria-hidden="true">{isDarkMode ? '☀' : '☾'}</span>
          </CButton>
        </CContainer>
      </CNavbar>
      <main className="app-content">{PAGES[currentPage]}</main>
    </>
  )
}

export default App
