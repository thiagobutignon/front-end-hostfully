import { defaultTheme } from '@/presentation/styles/themes'

const sut = defaultTheme.semanticTokens

describe('Default Theme', () => {
  it('should have defined semantic tokens', () => {
    expect(defaultTheme.semanticTokens).toBeDefined()
  })

  it('should have defined background colors', () => {
    const {
      colors: { background }
    } = sut
    expect(background).toBeDefined()
    expect(background.default).toEqual('#FFEBE6')
    expect(background._dark).toEqual('#333333')
  })

  it('should have defined background colors', () => {
    const {
      colors: { reverseBackground }
    } = sut
    expect(reverseBackground).toBeDefined()
    expect(reverseBackground.default).toEqual('#333333')
    expect(reverseBackground._dark).toEqual('#FFEBE6')
  })

  it('should have defined text colors', () => {
    const {
      colors: { text }
    } = sut
    expect(text).toBeDefined()
    expect(text.default).toEqual('#333333')
    expect(text._dark).toEqual('#FFEBE6')
  })

  it('should have defined text colors', () => {
    const {
      colors: { reverseText }
    } = sut
    expect(reverseText).toBeDefined()
    expect(reverseText.default).toEqual('#FFEBE6')
    expect(reverseText._dark).toEqual('#333333')
  })

  it('should have defined detail colors', () => {
    const {
      colors: { detail }
    } = sut
    expect(detail).toBeDefined()
    expect(detail.default).toEqual('#BFD8D2')
    expect(detail._dark).toEqual('#D4B483')
  })

  it('should have defined buttonHud colors', () => {
    const {
      colors: { buttonHud }
    } = sut
    expect(buttonHud).toBeDefined()
    expect(buttonHud.default).toEqual('rgba(207, 216, 220, 0.7)')
    expect(buttonHud._dark).toEqual('rgba(142, 124, 195, 0.7)')
  })

  it('should have defined successButton colors', () => {
    const {
      colors: { successButton }
    } = sut
    expect(successButton).toBeDefined()
    expect(successButton.default).toEqual('#A1E887')
    expect(successButton._dark).toEqual('#A1E887')
  })

  it('should have defined error colors', () => {
    const {
      colors: { error }
    } = sut
    expect(error).toBeDefined()
    expect(error.default).toEqual('#F4B6C2')
    expect(error._dark).toEqual('#F4B6C2')
  })

  it('should have defined delete colors', () => {
    const {
      colors: { delete: deleteColor }
    } = sut
    expect(deleteColor).toBeDefined()
    expect(deleteColor.default).toEqual('#FFADAD')
    expect(deleteColor._dark).toEqual('#FFADAD')
  })
})
