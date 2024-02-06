import { ThemeStyles } from '@/presentation/styles/models'
import { debugTheme } from '@/presentation/styles/themes/debug-theme'
import { defaultTheme } from '@/presentation/styles/themes/default-theme'

export const getActiveTheme = (env = process.env.ACTIVE_THEME): ThemeStyles => {
  switch (env) {
    case 'debug':
      return debugTheme
    default:
      return defaultTheme
  }
}
const activeTheme = getActiveTheme()
export default activeTheme
