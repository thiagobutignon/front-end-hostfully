import activeTheme from '../active-theme'
import { useColorMode } from '@chakra-ui/react'

namespace ReverseColor {
  export type Props = {
    text: string
    background: string
  }
}

export const useReverseColor = (): ReverseColor.Props => {
  const { colorMode } = useColorMode()
  const isLightMode = colorMode === 'light'
  const theme = activeTheme.semanticTokens.colors
  const background = isLightMode
    ? theme.reverseBackground._dark
    : theme.reverseBackground._dark
  const text = isLightMode ? theme.reverseText._dark : theme.reverseText._dark
  return { background, text }
}
