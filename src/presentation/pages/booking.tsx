import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import { CreateBookingUsecase, ListBookingsUsecase } from '@/domain/usecases'
import {
  ErrorComponent,
  PropertyInfoComponent
} from '@/presentation/components'
import { SimpleGrid, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import { usePropertiesContext } from '@/presentation/context'
import { useListBookings } from '@/presentation/hooks'
import BookingCardComponent from '@/presentation/pages/booking-card'
import BookingForm from '@/presentation/pages/booking-form'
import { Validation } from '@/validation/protocols'

type Props = {
  listBookings: ListBookingsUsecase
  validation: Validation
  createBooking: CreateBookingUsecase
}

export const BookingPage: React.FC<Props> = ({
  listBookings,
  validation,
  createBooking
}: Props) => {
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

  const handleBookingSubmitted = (): void => {
    setReloadFlag((oldFlag) => !oldFlag)
  }

  const error = errorProperties || listBookingError
  if (error) {
    return (
      <ErrorComponent
        error={error}
        reload={() => {
          setReloadFlag((oldFlag) => !oldFlag)
        }}
      />
    )
  }

  if (listBookingIsLoading || isLoadingProperties) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      {selectedProperty && (
        <>
          <PropertyInfoComponent selectedProperty={selectedProperty}>
            <BookingForm
              createBooking={createBooking}
              listBookings={listBookings}
              onBookingSubmitted={handleBookingSubmitted}
              reloadFlag={reloadFlag}
              validation={validation}
            />
            <SimpleGrid columns={[1, null, 2]} spacing="40px" mt={4}>
              {bookings.booking.map((booking) => (
                <BookingCardComponent booking={booking} key={booking.id} />
              ))}
            </SimpleGrid>
          </PropertyInfoComponent>
        </>
      )}
    </>
  )
}
