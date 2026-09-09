import { useState, useEffect, createContext, useContext } from 'react'
import { ranking } from '../../../shared/types'

export const RankingsContext = createContext<ranking[]>([])

export function useRankingsController(): ranking[] {
  const [rankings, setRankings] = useState<ranking[]>([])

  useEffect(() => {
    const fetchRankings = async (): Promise<void> => {
      const importedRankings = await window.api.getRankings()
      setRankings(importedRankings)
    }

    fetchRankings()
  }, [])

  return rankings
}

export function useRankings(): ranking[] {
  const context = useContext(RankingsContext)
  if (!context) {
    throw new Error('useRankings must be used within a RankingsProvider')
  }
  return context
}
