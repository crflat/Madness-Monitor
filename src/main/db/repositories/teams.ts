import { getDb } from '../connection'
import { team } from '../../../shared/types'

export function saveTeams(rows: team[]): number {
  const db = getDb()

  const upsertTeam =
    db.prepare(`INSERT INTO teams (team_id, team_name, conference) VALUES (?, ?, ?) ON CONFLICT (team_id) DO UPDATE SET 
      team_name = excluded.team_name,
      conference = excluded.conference`)

  const setPower = getDb().prepare(`UPDATE teams SET is_power =
    CASE WHEN conference IN ('ACC','Big Ten','Big 12','SEC','Big East') THEN 1 ELSE 0 END;`)

  const saveAll = db.transaction((input: team[]): number => {
    let saved = 0

    for (const t of input) {
      if (t.id === null) continue
      upsertTeam.run(t.id, t.displayName, t.conference)
      saved++
    }
    setPower.run()
    return saved
  })

  return saveAll(rows)
}

export function countTeams(): number {
  const rows = getDb().prepare('SELECT COUNT(*) AS n FROM teams').get() as { n: number }
  return rows.n
}
