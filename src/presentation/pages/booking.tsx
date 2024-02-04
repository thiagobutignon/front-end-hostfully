import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

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
import React, { useEffect, useState } from 'react'
import { addDays, eachDayOfInterval } from 'date-fns'

import { DateRangePicker } from 'react-date-range'
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

  const bookedDates = [
    { start: new Date('2024-02-11'), end: new Date('2024-02-17') },
    { start: new Date('2024-02-20'), end: new Date('2024-02-23') },
    { start: new Date('2024-02-25'), end: new Date('2024-02-29') }
  ]

  const [bookingDetails, setBookingDetails] =
    useState<CreateBookingUsecase.Params>({
      guestEmail: '',
      guests: {} as Guest.Model,
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      createdAt: new Date(),
      property: selectedProperty
    })

  const handleSelect = (ranges: any): void => {
    setBookingDetails({
      ...bookingDetails,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate
    })
  }

  const selectionRange = {
    startDate: bookingDetails.startDate,
    endDate: bookingDetails.endDate,
    key: 'selection'
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
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

  const [disabledDates, setDisabledDates] = useState<Date[]>([])

  useEffect(() => {
    // Assuming bookedDates is an array of { start, end } objects
    const newDisabledDates = bookedDates.flatMap(({ start, end }) =>
      eachDayOfInterval({
        start: addDays(start, 1),
        end: addDays(end, 1)
      })
    )

    setDisabledDates(newDisabledDates)
  }, [bookedDates])

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

                <FormControl>
                  <FormLabel>Booking Dates</FormLabel>
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                    minDate={new Date()}
                    rangeColors={['#00A3C4']} // Use your theme color
                    disabledDates={disabledDates}
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
