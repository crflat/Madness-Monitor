export interface ranking {
  season: number
  seasonType: 'postseason' | 'regular' | 'preseason'
  week: number
  pollDate: string | null
  pollType: string
  teamId: number
  team: string
  conference: string | null
  ranking: number | null
  points: number | null
  firstPlaceVotes: number | null
}
