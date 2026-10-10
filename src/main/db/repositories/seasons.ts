import type Database from 'better-sqlite3'
import seasonsCSV from '../../sources/seasons.csv?raw'

interface SeasonRow {
  season_id: number
  label: string
  is_active: 0 | 1
}

const EXPECTED_HEADER = 'season_id,label,is_active'

function parseCSV(text: string): SeasonRow[] {
  const lines = text
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== '')

  const [header, ...body] = lines
  if (header !== EXPECTED_HEADER) {
    throw new Error(`seasons.csv: header did not match ${EXPECTED_HEADER}, instead got ${header}`)
  }

  const read = new Set<number>()

  const rows = body.map((line, i): SeasonRow => {
    const [id, label, active, ...extra] = line.split(',')
    const seasonId = Number(id)
    if (
      extra.length > 0 ||
      !Number.isInteger(seasonId) ||
      !label?.trim() ||
      (active !== '1' && active !== '0')
    ) {
      throw new Error(`seasons.csv Line ${i + 2}: ${line} is unable to be read.`)
    }
    if (read.has(seasonId)) throw new Error(`seasons.csv Line ${i + 2}: duplicate ${seasonId}`)
    read.add(seasonId)
    return { season_id: seasonId, label: label.trim(), is_active: active === '1' ? 1 : 0 }
  })

  const activeCount = rows.filter((r) => r.is_active).length
  if (activeCount !== 1) {
    throw new Error(`seasons.csv: active seasons should be 1, instead found ${activeCount}`)
  }
  return rows
}

export function syncSeasons(db: Database.Database): number {
  const rows = parseCSV(seasonsCSV)
  const upsert = db.prepare(
    `INSERT INTO seasons (season_id, label, is_active) VALUES (?, ?, ?) ON CONFLICT (season_id) DO UPDATE SET label = excluded.label, is_active = excluded.is_active`
  )
  db.transaction(() => {
    for (const r of rows) upsert.run(r.season_id, r.label, r.is_active)
  })()

  return rows.length
}
