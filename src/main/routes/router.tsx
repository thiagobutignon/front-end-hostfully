import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {
  makeRemoteListBookings,
  makeRemoteListProperties
} from '@/main/factories/data'

import { BookingPage } from '@/presentation/pages'
import { LayoutComponent } from '@/presentation/components'
import React from 'react'
import theme from '@/presentation/styles/theme'

const makeBookingPage: React.FC = () => {
  const listProperties = makeRemoteListProperties()
  return (
    <LayoutComponent listProperties={listProperties}>
      <BookingPage
        listBookings={makeRemoteListBookings()}
        listProperties={listProperties}
      />
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
