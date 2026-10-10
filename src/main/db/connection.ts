import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'node:path'
import { MIGRATIONS } from './migrations'
import { syncSeasons } from './repositories/seasons'

let db: Database.Database | null = null

export function openDatabase(): Database.Database {
  if (db) return db

  const file = join(app.getPath('userData'), 'madness-monitor.db')
  console.log(`[db] opening ${file}`)

  db = new Database(file)

  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  db.pragma('synchronous = NORMAL')
  db.pragma('busy_timeout = 5000')

  runMigrations(db)
  syncSeasons(db)
  return db
}

export function getDb(): Database.Database {
  if (!db) throw new Error('Database is not open yet. Call openDatabase() first.')
  return db
}

export function closeDatabase(): void {
  db?.close()
  db = null
}

function runMigrations(database: Database.Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version    TEXT PRIMARY KEY,
      applied_on TEXT NOT NULL
    ) STRICT
  `)

  const rows = database.prepare('SELECT version FROM schema_migrations').all() as {
    version: string
  }[]
  const applied = new Set(rows.map((r) => r.version))

  for (const migration of MIGRATIONS) {
    if (applied.has(migration.version)) continue

    const apply = database.transaction(() => {
      database.exec(migration.sql)
      database
        .prepare('INSERT INTO schema_migrations (version, applied_on) VALUES (?, ?)')
        .run(migration.version, new Date().toISOString())
    })
    apply()
    console.log(`[db] applied migration ${migration.version}`)
  }
}
