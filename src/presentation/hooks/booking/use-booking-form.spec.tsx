import {
  createBookingsResultMock,
  guestModelMock,
  propertyModelMock
} from '@/domain/mocks'
import { Guest, PropertyModel } from '@/domain/models'
import { act, renderHook, waitFor } from '@testing-library/react'

import { CreateBookingUsecase } from '@/domain/usecases'
import { useBookingForm } from '@/presentation/hooks/booking/use-booking-form'
import { Validation } from '@/validation/protocols'

describe('useBookingForm', () => {
  let result: any
  const selectedProperty: PropertyModel = propertyModelMock()
  const validation: jest.Mocked<Validation> = {
    validate: jest.fn()
  }
  const createBooking: jest.Mocked<CreateBookingUsecase> = {
    perform: jest.fn()
  }

  const onBookingSubmitted = jest.fn()

  beforeEach(async () => {
    const hook = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )
    result = hook.result
  })

  test('should initialize correctly', () => {
    expect(result.current.bookingDetails).toBeDefined()
    expect(result.current.dateRange).toBeDefined()
    expect(result.current.numberOfGuestsInput).toBeDefined()
  })

  test('should handle guest number change correctly', async () => {
    await act(async () => {
      result.current.handleNumberOfGuestsChange({
        target: { value: '3' }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.numberOfGuestsInput.value).toBe('3')
  })

  test('should handle guest info change correctly', async () => {
    const updatedGuest: Guest.Info = guestModelMock().guests[0]

    await act(async () => {
      result.current.handleGuestInfoChange(0, updatedGuest)
    })

    expect(result.current.bookingDetails.guests.guests[0]).toEqual(updatedGuest)
  })
  test('should handle form submission correctly', async () => {
    createBooking.perform.mockResolvedValue(createBookingsResultMock())

    await act(async () => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.FormEvent)
    })

    await waitFor(() => {
      expect(createBooking.perform).toHaveBeenCalledTimes(1)
      expect(onBookingSubmitted).toHaveBeenCalledWith()
    })
  })

  test('should handle errors during form submission', async () => {
    createBooking.perform.mockRejectedValue(new Error('Mock error'))

    await act(async () => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.FormEvent)
    })

    waitFor(() => {
      expect(result.current.bookingDetails.mainError).toBe(
        'Invalid form, please try again.'
      )
      expect(result.current.bookingDetails.isLoading).toBe(false)
    })
  })

  test('should handle date selection correctly', async () => {
    const mockRange = {
      selection: {
        startDate: new Date(),
        endDate: new Date()
      }
    }

    await act(async () => {
      result.current.handleSelect(mockRange)
    })

    expect(result.current.dateRange).toEqual([mockRange.selection])
  })

  test('should handle error when number of guests exceeds max', async () => {
    await act(async () => {
      result.current.handleNumberOfGuestsChange({
        target: { value: (selectedProperty.maxGuests + 1).toString() }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.numberOfGuestsInput.error).toBe(
      `Number of guests cannot exceed ${selectedProperty.maxGuests}.`
    )
  })

  test('should handle error for invalid number of guests input', async () => {
    const { result } = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )

    await act(async () => {
      result.current.handleNumberOfGuestsChange({
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.numberOfGuestsInput.error).toBe(
      'Number of guests must be greater than 0.'
    )
  })
})
