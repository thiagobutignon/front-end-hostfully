import { defaultTheme } from '@/presentation/styles/themes'

const sut = defaultTheme.semanticTokens

describe('Default Theme', () => {
  test('should have defined semantic tokens', () => {
    expect(defaultTheme.semanticTokens).toBeDefined()
  })

  test('should have defined background colors', () => {
    const {
      colors: { background }
    } = sut
    expect(background).toBeDefined()
    expect(background.default).toEqual('#F0EBE6')
    expect(background._dark).toEqual('#2B2D42')
  })

  test('should have defined background colors', () => {
    const {
      colors: { reverseBackground }
    } = sut
    expect(reverseBackground).toBeDefined()
    expect(reverseBackground.default).toEqual('#5D5C61')
    expect(reverseBackground._dark).toEqual('#F0EBE6')
  })

  test('should have defined text colors', () => {
    const {
      colors: { text }
    } = sut
    expect(text).toBeDefined()
    expect(text.default).toEqual('#2B2D42')
    expect(text._dark).toEqual('#F0EBE6')
  })

  test('should have defined text colors', () => {
    const {
      colors: { reverseText }
    } = sut
    expect(reverseText).toBeDefined()
    expect(reverseText.default).toEqual('#F0EBE6')
    expect(reverseText._dark).toEqual('#5D5C61')
  })

  test('should have defined detail colors', () => {
    const {
      colors: { detail }
    } = sut
    expect(detail).toBeDefined()
    expect(detail.default).toEqual('#8D99AE')
    expect(detail._dark).toEqual('#EDD4B2')
  })

  test('should have defined buttonHud colors', () => {
    const {
      colors: { buttonHud }
    } = sut
    expect(buttonHud).toBeDefined()
    expect(buttonHud.default).toEqual('rgba(216, 178, 155, 0.7)')
    expect(buttonHud._dark).toEqual('rgba(108, 92, 231, 0.7)')
  })

  test('should have defined successButton colors', () => {
    const {
      colors: { successButton }
    } = sut
    expect(successButton).toBeDefined()
    expect(successButton.default).toEqual('#4CAF50')
    expect(successButton._dark).toEqual('#4CAF50')
  })

  test('should have defined error colors', () => {
    const {
      colors: { error }
    } = sut
    expect(error).toBeDefined()
    expect(error.default).toEqual('#EF233C')
    expect(error._dark).toEqual('#EF233C')
  })

  test('should have defined delete colors', () => {
    const {
      colors: { delete: deleteColor }
    } = sut
    expect(deleteColor).toBeDefined()
    expect(deleteColor.default).toEqual('#D90429')
    expect(deleteColor._dark).toEqual('#D90429')
  })
})
