import m001_initial from './001_initial.sql?raw'

export interface Migration {
  version: string
  sql: string
}

export const MIGRATIONS: Migration[] = [{ version: '001_initial', sql: m001_initial }]
