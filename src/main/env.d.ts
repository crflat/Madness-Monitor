/// <reference types="electron-vite/node" />

interface ImportMetaEnv {
  readonly MAIN_VITE_CBBD_API_KEY: string
}

declare module '*.sql?raw' {
  const sql: string
  export default sql
}

declare module '*.csv?raw' {
  const text: string
  export default text
}
