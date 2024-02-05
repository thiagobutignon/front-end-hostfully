import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text
} from '@chakra-ui/react'
import { CreateBookingUsecase, ListBookingsUsecase } from '@/domain/usecases'
import {
  ErrorComponent,
  InputError,
  InputWithLabel,
  PropertyInfoComponent
} from '@/presentation/components'
import React, { useEffect, useState } from 'react'
import { addDays, eachDayOfInterval } from 'date-fns'

import { DateRange } from 'react-date-range'
import { Guest } from '@/domain/models'
import GuestsFormComponent from '@/presentation/components/input/guests-form'
import { Validation } from '@/validation/protocols'
import { useListBookings } from '@/presentation/hooks'
import { usePropertiesContext } from '@/presentation/context'
import { useReverseColor } from '@/presentation/styles/themes'

type Props = {
  listBookings: ListBookingsUsecase
  validation: Validation
}

type BookingPageStateError = {
  guestEmailError: string
  numberOfGuestsError: string
  guestsInfoError: string
  startDateError: string
  endDateError: string
}

export const BookingPage: React.FC<Props> = ({
  listBookings,
  validation
}: Props) => {
  const { text } = useReverseColor()
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

  const [bookingDetails, setBookingDetails] = useState<
    CreateBookingUsecase.Params & BookingPageStateError
  >({
    guestEmail: '',
    guests: {
      numberOfGuests: 0,
      guests: [{ name: '', email: '' }]
    } as Guest.Model,
    startDate: new Date(),
    endDate: null,
    createdAt: new Date(),
    property: selectedProperty,

    guestEmailError: '',
    numberOfGuestsError: '',
    guestsInfoError: '',
    startDateError: '',
    endDateError: ''
  })

  useEffect(() => {
    validate('guestEmail')
  }, [bookingDetails.guestEmail])

  useEffect(() => {
    validate('numberOfGuests')
  }, [bookingDetails.guests.numberOfGuests])

  useEffect(() => {
    validate('guests.guests')
  }, [bookingDetails.guests.guests])

  useEffect(() => {
    validate('startDate')
  }, [bookingDetails.startDate])

  useEffect(() => {
    validate('endDate')
  }, [bookingDetails.endDate])

  const validate = (field: string): void => {
    const { guestEmail, startDate, endDate, guests } = bookingDetails
    const { numberOfGuests, guests: guestsInfo } = guests
    const formData = {
      guestEmail,
      startDate,
      endDate,
      numberOfGuests,
      guestsInfo
    }
    const fieldError = validation.validate(field, formData)

    setBookingDetails((old) => {
      const newErrorState = { ...old, [`${field}Error`]: fieldError }
      const isFormInvalid =
        !!newErrorState.guestEmailError ||
        !!newErrorState.numberOfGuestsError ||
        !!newErrorState.guestsInfoError ||
        !!newErrorState.startDateError ||
        !!newErrorState.endDateError

      return { ...newErrorState, isFormInvalid }
    })
  }

  const handleGuestInfoChange = (
    index: number,
    updatedGuest: Guest.Info
  ): any => {
    setBookingDetails((prevDetails) => {
      const updatedGuests = [...prevDetails.guests.guests]
      updatedGuests[index] = updatedGuest

      return {
        ...prevDetails,
        guests: {
          ...prevDetails.guests,
          guests: updatedGuests
        }
      }
    })
  }

  const handleSelect = (ranges: any): void => {
    setDateRange([ranges.selection])
    setBookingDetails({
      ...bookingDetails,
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate
    })
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

  const [numberOfGuestsInput, setNumberOfGuestsInput] = useState({
    value: bookingDetails.guests.numberOfGuests.toString(),
    error: ''
  })
  const handleNumberOfGuestsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputVal = e.target.value
    const newNumberOfGuests = parseInt(inputVal, 10)

    if (inputVal === '' || isNaN(newNumberOfGuests) || newNumberOfGuests <= 0) {
      setNumberOfGuestsInput({
        value: inputVal,
        error: 'Number of guests must be greater than 0.'
      })
    } else if (newNumberOfGuests > selectedProperty.maxGuests) {
      setNumberOfGuestsInput({
        value: inputVal,
        error: `Number of guests cannot exceed ${selectedProperty.maxGuests}.`
      })
    } else {
      setNumberOfGuestsInput({ value: inputVal, error: '' })
      setBookingDetails((prevDetails) => ({
        ...prevDetails,
        guests: {
          ...prevDetails.guests,
          numberOfGuests: newNumberOfGuests
        }
      }))
    }
  }

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ])

  return (
    <>
      {selectedProperty && (
        <>
          <PropertyInfoComponent selectedProperty={selectedProperty} />
          <Text>{JSON.stringify(bookingDetails)}</Text>
          <Box p={5}>
            <Heading>Book this property</Heading>
            <form onSubmit={handleSubmit} data-testid="form">
              <Stack spacing={4}>
                <InputWithLabel
                  id="guestEmail"
                  type="email"
                  name="guestEmail"
                  state={bookingDetails}
                  setState={setBookingDetails}
                  color={text}
                  textColor={text}
                >
                  Email:
                </InputWithLabel>

                <FormControl id="numberOfGuests">
                  <FormLabel>Number of Guests:</FormLabel>
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
                    ranges={dateRange}
                    onChange={handleSelect}
                    minDate={new Date()}
                    rangeColors={['#00A3C4']}
                    disabledDates={disabledDates}
                    direction="horizontal"
                    moveRangeOnFirstSelection={false}
                    months={2}
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
