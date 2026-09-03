import { getCBBD_API_KEY } from '../config'

interface ranking {
  season: number
  seasonType: 'postseason' | 'regular' | 'preseason'
  week: number
  pollDate: string | null
  polltype: string
  teamId: number
  team: string
  conference: string | null
  ranking: number | null
  points: number | null
  firstPlaceVotes: number | null
}

export async function getRankings(): Promise<ranking[] | []> {
  try {
    const request: RequestInfo = new Request('https://api.collegebasketballdata.com/rankings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCBBD_API_KEY()}`
      }
    })

    const response = await fetch(request)

    const rankings: ranking[] = await response.json()

    return rankings
  } catch (error) {
    console.error('Error fetching rankings:', error)
    return []
  }
}
