import { renderHook, waitFor } from '@testing-library/react'

import { ListBookingsUsecase } from '@/domain/usecases'
import { useListBookings } from '@/presentation/hooks'

describe('useListBookings', () => {
  const mockListBookings = {
    perform: jest.fn().mockResolvedValue([] as ListBookingsUsecase.Result)
  }
  it('should start with initial state', async () => {
    const { result } = renderHook(() =>
      useListBookings(mockListBookings as ListBookingsUsecase)
    )
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe('')
      expect(result.current.bookings).toEqual([])
    })
  })

  it('should handle loading state correctly', async () => {
    mockListBookings.perform.mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() =>
      useListBookings(mockListBookings as unknown as ListBookingsUsecase)
    )

    expect(result.current.isLoading).toBe(true)

    expect(result.current.bookings).toEqual([])
    expect(result.current.error).toBe('')
  })

  it('should handle successful data fetching', async () => {
    const mockData = [{ id: 1, name: 'Booking 1' }]
    mockListBookings.perform.mockResolvedValue(mockData)
    const { result } = renderHook(() =>
      useListBookings(mockListBookings as unknown as ListBookingsUsecase)
    )

    await waitFor(() => {
      expect(result.current.bookings).toEqual(mockData)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe('')
    })
  })

  it('should handle errors correctly', async () => {
    const errorMessage = 'Error fetching bookings'
    mockListBookings.perform.mockRejectedValue(new Error(errorMessage))
    const { result } = renderHook(() =>
      useListBookings(mockListBookings as unknown as ListBookingsUsecase)
    )

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage)
      expect(result.current.isLoading).toBe(false)
    })
  })
})
