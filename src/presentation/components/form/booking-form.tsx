import {
  CreateBookingUsecase,
  ListBookingsUsecase,
  UpdateBookingUsecase
} from '@/domain/usecases'
import { InputError, InputWithLabel } from '@/presentation/components'
import {
  useBookingForm,
  useDisabledDates,
  useListBookings
} from '@/presentation/hooks'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useBreakpointValue
} from '@chakra-ui/react'

import { Booking } from '@/domain/models'
import GuestsFormComponent from '@/presentation/components/input/guests-form'
import { usePropertiesContext } from '@/presentation/context'
import { useReverseColor } from '@/presentation/styles/themes'
import { Validation } from '@/validation/protocols'
import React from 'react'
import { DateRange } from 'react-date-range'

type BookingFormProps = {
  reloadFlag: boolean
  listBookings: ListBookingsUsecase
  validation: Validation
  createBooking: CreateBookingUsecase
  onBookingSubmitted: () => void
  updateBooking?: UpdateBookingUsecase
  initialBooking?: Booking.Model | null
  onUpdateCompleted?: () => void
}

const BookingForm: React.FC<BookingFormProps> = ({
  reloadFlag,
  listBookings,
  validation,
  createBooking,
  onBookingSubmitted,
  initialBooking,
  updateBooking,
  onUpdateCompleted
}) => {
  const { text } = useReverseColor()
  const monthsToShow = useBreakpointValue({ base: 1, md: 2 })

  const { selectedProperty } = usePropertiesContext()

  const { bookings } = useListBookings(listBookings, reloadFlag)

  const disabledDates = useDisabledDates(bookings.booking, reloadFlag)

  const {
    bookingDetails,
    setBookingDetails,
    dateRange,
    handleSubmit,
    handleSelect,
    handleGuestInfoChange,
    handleNumberOfGuestsChange,
    numberOfGuestsInput
  } = useBookingForm(
    validation,
    selectedProperty,
    createBooking,
    onBookingSubmitted,
    onUpdateCompleted,
    updateBooking,
    initialBooking
  )

  return (
    <Box>
      <Heading>
        {initialBooking ? 'Updating Booking' : 'Book this property'}
      </Heading>
      <form onSubmit={handleSubmit} data-testid="form">
        <Stack alignItems={'flex-start'} spacing={4}>
          <InputWithLabel
            id="guestEmail"
            type="email"
            name="guestEmail"
            state={bookingDetails}
            setState={setBookingDetails}
            color={text}
          >
            Email:
          </InputWithLabel>

          <FormControl id="numberOfGuests">
            <FormLabel fontSize={'14px'} ml={'20px'}>
              Number of Guests:
            </FormLabel>
            <Input
              type="number"
              name="numberOfGuests"
              value={
                Number(numberOfGuestsInput.value) === 0
                  ? ''
                  : numberOfGuestsInput.value
              }
              onChange={handleNumberOfGuestsChange}
              onBlur={handleNumberOfGuestsChange}
              color={text}
              w={{ base: '315px', md: '359px' }}
              h={'40px'}
              flexShrink={0}
              textColor={'text'}
              _hover={{}}
              bg={'backgroundColor'}
            />
            {numberOfGuestsInput.error && (
              <InputError>{numberOfGuestsInput.error}</InputError>
            )}
          </FormControl>
          <GuestsFormComponent
            guests={bookingDetails.guests}
            onGuestInfoChange={handleGuestInfoChange}
          />

          <FormControl>
            <FormLabel>Booking Dates</FormLabel>

            <DateRange
              key={disabledDates.length}
              ranges={dateRange}
              onChange={handleSelect}
              minDate={new Date()}
              rangeColors={['#00A3C4']}
              disabledDates={disabledDates}
              direction="horizontal"
              moveRangeOnFirstSelection={false}
              months={monthsToShow}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            {initialBooking ? 'Update Book' : 'Book Now'}
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default BookingForm
