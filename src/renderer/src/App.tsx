import Home from './pages/Home'
import APRankings from './pages/APRankings'
import RankingsChart from './pages/RankingsChart'
import Scorecards from './pages/Scorecards'
import Tournaments from './pages/Tournaments'
import { useState } from 'react'

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
      <nav>
        <button onClick={() => setCurrentPage('home')}>Home</button>
        <button onClick={() => setCurrentPage('aprankings')}>AP Rankings</button>
        <button onClick={() => setCurrentPage('rankingschart')}>Rankings Chart</button>
        <button onClick={() => setCurrentPage('scorecards')}>Scorecards</button>
        <button onClick={() => setCurrentPage('tournaments')}>Tournaments</button>
      </nav>
      {PAGES[currentPage]}
    </>
  )
}

export default App
