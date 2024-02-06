import { act, renderHook, waitFor } from '@testing-library/react'

import { DeleteBookingByIdUsecase } from '@/domain/usecases'
import { useDeleteBooking } from '@/presentation/hooks/booking/use-delete-booking'

describe('useDeleteBooking', () => {
  let deleteBookingMock: jest.MockedFunction<
  DeleteBookingByIdUsecase['perform']
  >

  beforeEach(() => {
    deleteBookingMock = jest.fn()
  })

  test('should set isLoading to true while deleting and then false', async () => {
    deleteBookingMock.mockResolvedValue(true)
    const { result } = renderHook(() =>
      useDeleteBooking({ perform: deleteBookingMock })
    )

    act(() => {
      result.current.performDelete('1')
    })

    expect(result.current.isLoading).toBe(true)

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  test('should handle successful deletion', async () => {
    deleteBookingMock.mockResolvedValue(true)
    const { result } = renderHook(() =>
      useDeleteBooking({ perform: deleteBookingMock })
    )

    await act(async () => {
      await result.current.performDelete('1')
    })

    expect(deleteBookingMock).toHaveBeenCalledWith({ id: '1' })
    expect(result.current.error).toBeNull()
  })

  test('should handle deletion error', async () => {
    const errorMessage = 'Invalid id'
    deleteBookingMock.mockRejectedValue(new Error(errorMessage))
    const { result } = renderHook(() =>
      useDeleteBooking({ perform: deleteBookingMock })
    )

    await act(async () => {
      await result.current.performDelete('invalid-id')
    })

    await waitFor(() => {
      expect(result.current.error).toBe('Invalid id, please try again.')
    })
  })
})
