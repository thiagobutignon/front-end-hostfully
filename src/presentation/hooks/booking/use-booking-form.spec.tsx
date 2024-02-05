import { Guest, PropertyModel } from '@/domain/models'
import { guestModelMock, propertyModelMock } from '@/domain/mocks'

import { CreateBookingUsecase } from '@/domain/usecases'
import { Validation } from '@/validation/protocols'
import { act } from 'react-dom/test-utils'
import { renderHook } from '@testing-library/react'
import { useBookingForm } from '@/presentation/hooks/booking/use-booking-form'

describe('useBookingForm', () => {
  const selectedProperty: PropertyModel = propertyModelMock()
  const validation: Validation = { validate: jest.fn() }
  const createBooking: CreateBookingUsecase = { perform: jest.fn() }

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
})
