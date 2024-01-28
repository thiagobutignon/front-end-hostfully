import { ThemeStyles } from '../models'
import { defaultTheme } from './default-theme'

export const getActiveTheme = (env = process.env.ACTIVE_THEME): ThemeStyles => {
  switch (env) {
    default:
      return defaultTheme
  }
}
const activeTheme = getActiveTheme()
export default activeTheme
