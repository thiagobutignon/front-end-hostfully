import {
  makeRemoteCreateBooking,
  makeRemoteDeleteBookingById,
  makeRemoteListBookings,
  makeRemoteListProperties,
  makeRemoteUpdateBooking
} from '@/main/factories/data'
import { ValidationBuilder, ValidationComposite } from '@/validation/validators'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { LayoutComponent } from '@/presentation/components'
import { PropertiesProvider } from '@/presentation/context/properties-context'
import { BookingPage } from '@/presentation/pages'
import theme from '@/presentation/styles/theme'
import React from 'react'

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
                <BookingPage
                  listBookings={makeRemoteListBookings()}
                  createBooking={makeRemoteCreateBooking()}
                  deleteBooking={makeRemoteDeleteBookingById()}
                  updateBooking={makeRemoteUpdateBooking()}
                  validation={ValidationComposite.build([
                    ...ValidationBuilder.field('guestsEmail')
                      .required()
                      .email()
                      .build(),
                    ...ValidationBuilder.field('numberOfGuests')
                      .required()
                      .min(1)
                      .build(),
                    ...ValidationBuilder.field('startDate').required().build(),
                    ...ValidationBuilder.field('endDate').required().build()
                  ])}
                />
              </LayoutComponent>
            </Route>
          </Switch>
        </BrowserRouter>
      </PropertiesProvider>
    </ChakraProvider>
  )
}

export default Router
