import { getCBBD_API_KEY } from '../config'
import { team } from '../../shared/types'

export async function importTeams(): Promise<team[]> {
  const CBBD_API_KEY = getCBBD_API_KEY()

  try {
    const request: RequestInfo = new Request('https://api.collegebasketballdata.com/teams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CBBD_API_KEY}`
      }
    })

    const response = await fetch(request)

    const teams: team[] = await response.json()

    const filteredTeams = teams.filter((t) => t.conference != null && t.conference.trim() !== '')
    console.log(filteredTeams)

    return filteredTeams
  } catch (error) {
    console.error('Error fetching teams:', error)
    return []
  }
}
