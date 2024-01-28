import {
  Button,
  ChakraProvider,
  ColorModeScript,
  useColorMode
} from '@chakra-ui/react'

import React from 'react'
import theme from '@/presentation/styles/theme'

const Example: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <header style={{ position: 'fixed' }}>
      <Button color={'successButton'} onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </header>
  )
}

const Router: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Example />

    </ChakraProvider>
  )
}

export default Router
