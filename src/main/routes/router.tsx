import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import { BookingPage } from '@/presentation/pages'
import { LayoutComponent } from '@/presentation/components'
import React from 'react'
import { makeRemoteListBookings } from '@/main/factories/data'
import theme from '@/presentation/styles/theme'

const makeBookingPage: React.FC = () => {
  return (
    <LayoutComponent>
      <BookingPage listBookings={makeRemoteListBookings()} />
    </LayoutComponent>
  )
}

const Router: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={makeBookingPage} />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default Router
