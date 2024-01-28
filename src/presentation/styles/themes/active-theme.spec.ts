import {
  defaultTheme,
  getActiveTheme
} from '@/presentation/styles/themes'

import { ThemeStyles } from '@/presentation/styles/models'

const makeSut = (env: string): ThemeStyles => {
  return getActiveTheme(env)
}
describe('Active Theme Tests', () => {
  it('should default to defaultTheme when ACTIVE_THEME is not set', () => {
    expect(makeSut('default')).toEqual(defaultTheme)
  })
})
