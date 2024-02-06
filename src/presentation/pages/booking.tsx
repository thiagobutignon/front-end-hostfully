import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import {
  CreateBookingUsecase,
  DeleteBookingByIdUsecase,
  ListBookingsUsecase,
  UpdateBookingUsecase
} from '@/domain/usecases'
import {
  BookingForm,
  ErrorComponent,
  PropertyInfoComponent
} from '@/presentation/components'
import { useDeleteBooking, useListBookings } from '@/presentation/hooks'
import { SimpleGrid, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

import { Booking } from '@/domain/models'
import BookingCardComponent from '@/presentation/components/card/booking-card'
import { usePropertiesContext } from '@/presentation/context'
import { Validation } from '@/validation/protocols'

type Props = {
  listBookings: ListBookingsUsecase
  validation: Validation
  createBooking: CreateBookingUsecase
  deleteBooking: DeleteBookingByIdUsecase
  updateBooking: UpdateBookingUsecase
}

export const BookingPage: React.FC<Props> = ({
  listBookings,
  validation,
  createBooking,
  deleteBooking,
  updateBooking
}: Props) => {
  const [reloadFlag, setReloadFlag] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking.Model | null>(
    null
  )

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

  const handleUpdateBooking = (booking: Booking.Model): void => {
    setSelectedBooking(booking)
  }

  const onUpdateCompleted = (): void => {
    setSelectedBooking(null)
  }

  const { performDelete } = useDeleteBooking(deleteBooking)

  const handleDeleteBooking = async (id: string): Promise<void> => {
    const result = await performDelete(id)
    if (result === true) {
      setReloadFlag((oldFlag) => !oldFlag)
    }
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
              data-testid="booking-form"
              createBooking={createBooking}
              listBookings={listBookings}
              onBookingSubmitted={handleBookingSubmitted}
              reloadFlag={reloadFlag}
              validation={validation}
              updateBooking={updateBooking}
              initialBooking={selectedBooking}
              onUpdateCompleted={onUpdateCompleted}
            />
            <SimpleGrid
              data-testid="booking-grid"
              columns={[1, null, 2]}
              spacing="40px"
              mt={4}
            >
              {bookings.booking.map((booking) => (
                <BookingCardComponent
                  booking={booking}
                  key={booking.id}
                  onDelete={handleDeleteBooking}
                  onUpdate={handleUpdateBooking}
                />
              ))}
            </SimpleGrid>
          </PropertyInfoComponent>
        </>
      )}
    </>
  )
}
