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

export interface team {
  id: number
  sourceId: string | null
  school: string | null
  mascot: string | null
  abbreviation: string | null
  displayName: string
  shortDisplayName: string | null
  primaryColor: string | null
  secondaryColor: string | null
  currentVenueId: number | null
  currentVenue: string | null
  currentCity: string | null
  currentState: string | null
  conferenceId: number | null
  conference: string
}
