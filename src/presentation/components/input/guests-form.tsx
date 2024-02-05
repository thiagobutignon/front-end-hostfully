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

  return (
    <VStack spacing={4}>
      {Array.from({ length: guests.numberOfGuests }, (_, index) => (
        <React.Fragment key={index}>
          <Input
            id={`name-${index}`}
            type="text"
            value={guests.guests[index]?.name || ''}
            onChange={(e) => {
              onGuestInfoChange(index, {
                ...guests.guests[index],
                name: e.target.value
              })
            }}
            placeholder="Name"
            color={text}
          />
          <Input
            id={`email-${index}`}
            type="email"
            value={guests.guests[index]?.email || ''}
            onChange={(e) => {
              onGuestInfoChange(index, {
                ...guests.guests[index],
                email: e.target.value
              })
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
