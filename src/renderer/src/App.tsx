import Home from './components/pages/Home'
import APRankings from './components/pages/APRankings'
import RankingsChart from './components/pages/RankingsChart'
import Scorecards from './components/pages/Scorecards'
import Tournaments from './components/pages/Tournaments'
import { useState } from 'react'
import { CContainer, CNavbar, CNavbarNav, CNavItem, CNavLink } from '@coreui/react'

const PAGES = {
  home: <Home></Home>,
  aprankings: <APRankings></APRankings>,
  rankingschart: <RankingsChart></RankingsChart>,
  scorecards: <Scorecards></Scorecards>,
  tournaments: <Tournaments></Tournaments>
}

function App(): React.JSX.Element {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <>
      <CNavbar colorScheme="dark" expand>
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
        </CContainer>
      </CNavbar>
      <main className="app-content">{PAGES[currentPage]}</main>
    </>
  )
}

export default App
