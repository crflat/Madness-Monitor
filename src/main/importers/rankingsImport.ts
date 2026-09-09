import { getCBBD_API_KEY } from '../config'
import { ranking } from '../../shared/types'

export async function importRankings(): Promise<ranking[]> {
  const CBBD_API_KEY = getCBBD_API_KEY()

  try {
    const request: RequestInfo = new Request(
      'https://api.collegebasketballdata.com/rankings?seasonType=regular&pollType=ap',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CBBD_API_KEY}`
        }
      }
    )

    const response = await fetch(request)

    const rankings: ranking[] = await response.json()

    return rankings
  } catch (error) {
    console.error('Error fetching rankings:', error)
    return []
  }
}
