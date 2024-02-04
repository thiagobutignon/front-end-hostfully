import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {
  makeRemoteListBookings,
  makeRemoteListProperties
} from '@/main/factories/data'

import { BookingPage } from '@/presentation/pages'
import { LayoutComponent } from '@/presentation/components'
import { PropertiesProvider } from '@/presentation/context/properties-context'
import React from 'react'
import theme from '@/presentation/styles/theme'

const Router: React.FC = () => {
  const listProperties = makeRemoteListProperties()

  return (
    <ChakraProvider theme={theme}>
      <PropertiesProvider listProperties={listProperties}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <Switch>
            <Route path="/">
              <LayoutComponent listProperties={listProperties}>
                <BookingPage listBookings={makeRemoteListBookings()} />
              </LayoutComponent>
            </Route>
          </Switch>
        </BrowserRouter>
      </PropertiesProvider>
    </ChakraProvider>
  )
}

export default Router
