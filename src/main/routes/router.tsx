import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {
  ChakraProvider,
  ColorModeScript
} from '@chakra-ui/react'

import { BookingPage } from '@/presentation/pages'
import React from 'react'
import theme from '@/presentation/styles/theme'

const Router: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
      <Switch>
        <Route path="/" component={BookingPage} />
      </Switch>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default Router
