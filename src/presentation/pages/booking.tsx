import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import { CreateBookingUsecase, ListBookingsUsecase } from '@/domain/usecases'
import {
  ErrorComponent,
  PropertyInfoComponent
} from '@/presentation/components'
import React, { useState } from 'react'

import { Guest } from '@/domain/models'
import { useListBookings } from '@/presentation/hooks'
import { usePropertiesContext } from '@/presentation/context'

type Props = {
  listBookings: ListBookingsUsecase
}

export const BookingPage: React.FC<Props> = ({ listBookings }: Props) => {
  const [reloadFlag, setReloadFlag] = useState(false)
  const {
    selectedProperty,
    error: errorProperties,
    isLoading: isLoadingProperties
  } = usePropertiesContext()

  const {
    bookings,
    isLoading: listBookingIsLoading,
    error: listBookingError
  } = useListBookings(listBookings, reloadFlag)

  const [bookingDetails, setBookingDetails] =
    useState<CreateBookingUsecase.Params>({
      guestEmail: '',
      guests: {} as Guest.Model,
      startDate: new Date(),
      endDate: new Date(),
      createdAt: new Date(),
      property: selectedProperty
    })

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    // Handle the form submission logic here
    console.log('Booking Details:', bookingDetails)
  }

  const reload = (): void => {
    setReloadFlag((oldFlag) => !oldFlag)
  }
  const error = errorProperties || listBookingError
  if (error) {
    return <ErrorComponent error={error} reload={reload} />
  }

  if (listBookingIsLoading || isLoadingProperties) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <Text>{JSON.stringify(bookings)}</Text>
      {selectedProperty && (
        <>
          <PropertyInfoComponent selectedProperty={selectedProperty} />

          <Box p={5}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel htmlFor="guestEmail">Guest Email</FormLabel>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={bookingDetails.guestEmail}
                    onChange={(e) => {
                      setBookingDetails({
                        ...bookingDetails,
                        guestEmail: e.target.value
                      })
                    }}
                  />
                </FormControl>
                {/* Additional form fields for startDate, endDate, guests, etc. */}
                <Button type="submit" colorScheme="blue">
                  Book Now
                </Button>
              </Stack>
            </form>
          </Box>
        </>
      )}
    </>
  )
}
