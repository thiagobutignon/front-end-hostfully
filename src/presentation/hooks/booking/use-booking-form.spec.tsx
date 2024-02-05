import { Guest, PropertyModel } from '@/domain/models'
import {
  createBookingsResultMock,
  guestModelMock,
  propertyModelMock
} from '@/domain/mocks'
import { renderHook, waitFor } from '@testing-library/react'

import { CreateBookingUsecase } from '@/domain/usecases'
import { Validation } from '@/validation/protocols'
import { act } from 'react-dom/test-utils'
import { useBookingForm } from '@/presentation/hooks/booking/use-booking-form'

type MockCreateBookingUsecase = jest.Mocked<CreateBookingUsecase>

describe('useBookingForm', () => {
  const selectedProperty: PropertyModel = propertyModelMock()
  const validation: Validation = { validate: jest.fn() }
  const createBooking: MockCreateBookingUsecase = {
    perform: jest.fn()
  } as MockCreateBookingUsecase

  const onBookingSubmitted = jest.fn()

  test('should initialize correctly', () => {
    const { result } = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )

    expect(result.current.bookingDetails).toBeDefined()
    expect(result.current.dateRange).toBeDefined()
    expect(result.current.numberOfGuestsInput).toBeDefined()
    // Further initialization checks...
  })

  test('should handle guest number change correctly', () => {
    const { result } = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )

    act(() => {
      result.current.handleNumberOfGuestsChange({
        target: { value: '3' }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.numberOfGuestsInput.value).toBe('3')
  })

  test('should handle guest info change correctly', () => {
    const { result } = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )

    const updatedGuest: Guest.Info = guestModelMock().guests[0]

    act(() => {
      result.current.handleGuestInfoChange(0, updatedGuest)
    })

    expect(result.current.bookingDetails.guests.guests[0]).toEqual(updatedGuest)
  })
  test('should handle form submission correctly', async () => {
    createBooking.perform.mockResolvedValue(createBookingsResultMock())

    const { result } = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )

    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn()
      } as unknown as React.FormEvent)

      waitFor(() => {
        expect(createBooking.perform).toHaveBeenCalledTimes(1)
        expect(onBookingSubmitted).toHaveBeenCalledWith()
      })
    })
  })

  test('should handle errors during form submission', async () => {
    createBooking.perform.mockRejectedValue(new Error('Mock error'))

    const { result } = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )

    act(() => {
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

  test('should handle date selection correctly', () => {
    const { result } = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )

    const mockRange = {
      selection: {
        startDate: new Date(),
        endDate: new Date()
      }
    }

    act(() => {
      result.current.handleSelect(mockRange)
    })

    expect(result.current.dateRange).toEqual([mockRange.selection])
  })

  test('should handle error when number of guests exceeds max', () => {
    const { result } = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )

    act(() => {
      result.current.handleNumberOfGuestsChange({
        target: { value: (selectedProperty.maxGuests + 1).toString() }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.numberOfGuestsInput.error).toBe(
      `Number of guests cannot exceed ${selectedProperty.maxGuests}.`
    )
  })

  test('should handle error for invalid number of guests input', () => {
    const { result } = renderHook(() =>
      useBookingForm(
        validation,
        selectedProperty,
        createBooking,
        onBookingSubmitted
      )
    )

    act(() => {
      result.current.handleNumberOfGuestsChange({
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.numberOfGuestsInput.error).toBe(
      'Number of guests must be greater than 0.'
    )
  })
})
