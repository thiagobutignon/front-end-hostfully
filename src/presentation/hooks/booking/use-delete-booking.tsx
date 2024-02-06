import { useCallback, useState } from 'react'

import { DeleteBookingByIdUsecase } from '@/domain/usecases'

type UseDeleteBookingReturn = {
  performDelete: (id: string) => Promise<DeleteBookingByIdUsecase.Result>
  isLoading: boolean
  error: string | null
}

export const useDeleteBooking = (
  deleteBooking: DeleteBookingByIdUsecase
): UseDeleteBookingReturn => {
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const performDelete = useCallback(
    async (id: string) => {
      setLoading(true)
      setError(null)
      try {
        return await deleteBooking.perform({ id })
      } catch {
        setError('Invalid id, please try again.')
      } finally {
        setLoading(false)
      }
    },
    [deleteBooking]
  )

  return { performDelete, isLoading, error }
}
