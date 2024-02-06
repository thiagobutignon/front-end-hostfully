import { Booking, Guest, PropertyModel } from '@/domain/models'
import { CreateBookingUsecase, UpdateBookingUsecase } from '@/domain/usecases'
import { useEffect, useState } from 'react'

import { Validation } from '@/validation/protocols'
import { addDays } from 'date-fns'

type BookingPageStateError = {
  guestEmailError: string
  numberOfGuestsError: string
  guestsInfoError: string
  startDateError: string
  endDateError: string

  isLoading: boolean
  isFormInvalid: boolean
  mainError: string
}

type BookingFormResult = {
  bookingDetails: CreateBookingUsecase.Params & BookingPageStateError
  setBookingDetails: React.Dispatch<
  React.SetStateAction<CreateBookingUsecase.Params & BookingPageStateError>
  >
  dateRange: Array<{
    startDate: Date
    endDate: Date
    key: string
  }>

  handleSubmit: (event: React.FormEvent) => void
  handleSelect: (ranges: any) => void
  handleGuestInfoChange: (index: number, updatedGuest: Guest.Info) => void
  handleNumberOfGuestsChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  numberOfGuestsInput: {
    value: string
    error: string
  }
}

type InitialState = CreateBookingUsecase.Params & BookingPageStateError

const initialState: InitialState = {
  guestEmail: '',
  guests: {
    numberOfGuests: 0,
    guests: [{ name: '', email: '' }]
  } as Guest.Model,
  startDate: new Date(),
  endDate: null,
  createdAt: new Date(),
  property: {} as PropertyModel,

  guestEmailError: '',
  numberOfGuestsError: '',
  guestsInfoError: '',
  startDateError: '',
  endDateError: '',
  isLoading: false,
  isFormInvalid: true,
  mainError: ''
}

const initialDateRange = [
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: 'selection'
  }
]

const initialNumberOfGuests = {
  value: '0',
  error: ''
}

export const useBookingForm = (
  validation: Validation,
  selectedProperty: PropertyModel,
  createBooking: CreateBookingUsecase,
  onBookingSubmitted: () => void,
  onBookingUpdated?: () => void,
  updateBooking?: UpdateBookingUsecase,
  initialBooking?: Booking.Model | null
): BookingFormResult => {
  const [dateRange, setDateRange] =
    useState<BookingFormResult['dateRange']>(initialDateRange)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [numberOfGuestsInput, setNumberOfGuestsInput] = useState(
    initialNumberOfGuests
  )

  const [bookingDetails, setBookingDetails] = useState<
  CreateBookingUsecase.Params & BookingPageStateError
  >({ ...initialState, property: selectedProperty })

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

  useEffect(() => {
    if (initialBooking) {
      setBookingDetails({
        ...bookingDetails,
        guestEmail: initialBooking.guestEmail,
        guests: initialBooking.guests,
        startDate: initialBooking.startDate,
        endDate: initialBooking.endDate
      })

      setDateRange([
        {
          startDate: new Date(initialBooking.startDate),
          endDate: new Date(initialBooking.endDate),
          key: 'selection'
        }
      ])

      setNumberOfGuestsInput({
        value: initialBooking.guests.numberOfGuests.toString(),
        error: ''
      })
    }
  }, [initialBooking])

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

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()

    if (!isSubmitted) {
      setIsSubmitted(true)

      if (bookingDetails.isLoading || bookingDetails.isFormInvalid) {
        setIsSubmitted(false)
        return
      }

      if (initialBooking && updateBooking) {
        await makeUpdateBooking()
      } else {
        await makeCreateBooking()
      }

      setIsSubmitted(false)
    }
  }

  const makeUpdateBooking = async (): Promise<void> => {
    try {
      setBookingDetails((prevState) => ({ ...prevState, isLoading: true }))
      const response = await updateBooking.perform({
        ...initialBooking,
        ...bookingDetails
      })
      if (response) {
        onBookingSubmitted()
        setBookingDetails({
          ...initialState,
          property: selectedProperty
        })
        onBookingUpdated()
        setDateRange(initialDateRange)
        setNumberOfGuestsInput(initialNumberOfGuests)
      }
    } catch {
      setBookingDetails((prevState) => ({
        ...prevState,
        mainError: 'Invalid form, please try again.',
        isLoading: false
      }))
    }
  }

  const makeCreateBooking = async (): Promise<void> => {
    try {
      setBookingDetails((prevState) => ({ ...prevState, isLoading: true }))
      const response = await createBooking.perform({
        guestEmail: bookingDetails.guestEmail,
        guests: bookingDetails.guests,
        startDate: bookingDetails.startDate,
        endDate: bookingDetails.endDate,
        createdAt: bookingDetails.createdAt,
        property: bookingDetails.property
      })
      if (response) {
        onBookingSubmitted()
        setBookingDetails({
          ...initialState,
          property: selectedProperty
        })
        setDateRange(initialDateRange)
        setNumberOfGuestsInput(initialNumberOfGuests)
      }
    } catch {
      setBookingDetails((prevState) => ({
        ...prevState,
        mainError: 'Invalid form, please try again.',
        isLoading: false
      }))
    }
  }

  return {
    bookingDetails,
    setBookingDetails,
    dateRange,
    handleSubmit,
    handleSelect,
    handleGuestInfoChange,
    handleNumberOfGuestsChange,
    numberOfGuestsInput
  }
}
