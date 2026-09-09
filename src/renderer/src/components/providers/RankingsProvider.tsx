import { ReactNode } from 'react'
import { RankingsContext, useRankingsController } from '../../hooks/useRankings'

export function RankingsProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const rankingsController = useRankingsController()
  return <RankingsContext.Provider value={rankingsController}>{children}</RankingsContext.Provider>
}

export default RankingsProvider
