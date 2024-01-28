export type ThemeStyles = {
  semanticTokens: ThemeStyles.SemanticTokens
  styles: ThemeStyles.Styles
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export namespace ThemeStyles {
  export type ColorMode = {
    default: string
    _dark: string
  }

  export type Styles = {
    global: {
      body: {
        bgColor: string
        color: string
      }
    }
  }

  export type SemanticTokens = {
    colors: {
      background: ColorMode
      text: ColorMode
      detail: ColorMode
      buttonHud: ColorMode
      successButton: ColorMode
      error: ColorMode
      delete: ColorMode
      reverseBackground: ColorMode
      reverseText: ColorMode
      iconColor: ColorMode
      reverseIconColor: ColorMode
      borderColor: ColorMode
      cardColor: ColorMode
    }
  }
}
