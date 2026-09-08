import { ElectronAPI } from '@electron-toolkit/preload'
import type { ranking } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getRankings: () => Promise<ranking[]>
    }
  }
}
