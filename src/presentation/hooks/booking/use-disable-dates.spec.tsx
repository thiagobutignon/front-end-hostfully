import { addDays } from 'date-fns'
import { bookingModelMock } from '@/domain/mocks'
import { renderHook } from '@testing-library/react'
import { useDisabledDates } from '@/presentation/hooks/booking/use-disable-dates'

describe('useDisabledDates', () => {
  it('should return an empty array when there are no bookings', () => {
    const { result } = renderHook(() => useDisabledDates([]))
    expect(result.current).toEqual([])
  })

  it('should return an array of disabled dates based on bookings', () => {
    const startDate = new Date()
    const endDate = addDays(startDate, 2)

    const { result } = renderHook(() =>
      useDisabledDates([bookingModelMock('1', startDate, endDate)])
    )

    expect(result.current).toHaveLength(3)
  })
})
