import { Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { Guest } from '@/domain/models'
import { useReverseColor } from '@/presentation/styles/themes'

type GuestsFormProps = {
  guests: Guest.Model
  onGuestInfoChange: (index: number, updatedGuest: Guest.Info) => void
}

const GuestsFormComponent: React.FC<GuestsFormProps> = ({
  guests,
  onGuestInfoChange
}) => {
  const { text } = useReverseColor()
  const validNumberOfGuests =
    Number.isInteger(guests.numberOfGuests) && guests.numberOfGuests > 0
      ? guests.numberOfGuests
      : 1

  const [bookingDetails, setBookingDetails] = useState<Guest.Model>({
    numberOfGuests: validNumberOfGuests,
    guests: Array(validNumberOfGuests).fill({ name: '', email: '' })
  })

  useEffect(() => {
    setBookingDetails({
      numberOfGuests: validNumberOfGuests,
      guests: Array(validNumberOfGuests).fill({ name: '', email: '' })
    })
  }, [])

  const handleInputChange = (
    index: number,
    field: string,
    value: string
  ): void => {
    const updatedGuests = bookingDetails.guests.map((guest, idx) => {
      if (idx === index) {
        return { ...guest, [field]: value }
      }
      return guest
    })

    const updatedBookingDetails = {
      ...bookingDetails,
      guests: updatedGuests
    }

    setBookingDetails(updatedBookingDetails)
    onGuestInfoChange(index, updatedBookingDetails.guests[index])
  }

  useEffect(() => {
    setBookingDetails(guests)
  }, [guests])

  return (
    <VStack spacing={4}>
      {Array.from({ length: guests.numberOfGuests }, (_, index) => (
        <React.Fragment key={index}>
          <Input
            data-testid={`input-name-${index}`}
            id={`name-${index}`}
            type="text"
            value={guests.guests[index]?.name || ''}
            onChange={(e) => {
              handleInputChange(index, 'name', e.target.value)
            }}
            placeholder="Name"
            color={text}
          />
          <Input
            data-testid={`input-email-${index}`}
            id={`email-${index}`}
            type="email"
            value={guests.guests[index]?.email || ''}
            onChange={(e) => {
              handleInputChange(index, 'email', e.target.value)
            }}
            placeholder="Email"
            color={text}
          />
        </React.Fragment>
      ))}
    </VStack>
  )
}

export default GuestsFormComponent
