import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { differenceInDays, format } from 'date-fns'

import { Booking } from '@/domain/models'
import React from 'react'

type BookingCardComponentProps = {
  booking: Booking.Model
  onDelete: (id: string) => void
}

const BookingCardComponent: React.FC<BookingCardComponentProps> = ({
  booking,
  onDelete
}: BookingCardComponentProps) => {
  const startDateFormatted = format(new Date(booking.startDate), 'PP')
  const endDateFormatted = format(new Date(booking.endDate), 'PP')
  const numberOfDays = differenceInDays(
    new Date(booking.endDate),
    new Date(booking.startDate)
  )

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      mb={4}
    >
      <VStack align="start">
        <Text fontWeight="bold">Booking ID: {booking.id}</Text>
        <Text>Property: {booking.property.name}</Text>
        <Text>Email: {booking.guestEmail}</Text>
        <HStack>
          <Text>Start Date: {startDateFormatted}</Text>
          <Text>End Date: {endDateFormatted}</Text>
        </HStack>
        <Text>Number of Guests: {booking.guests.numberOfGuests}</Text>
        <Text>Number of Nights: {numberOfDays}</Text>
        <Text>Total price: {booking.totalPrice}</Text>
      </VStack>
      <Button
        onClick={() => {
          onDelete(booking.id)
        }}
      >
        Delete
      </Button>
    </Box>
  )
}

export default BookingCardComponent
