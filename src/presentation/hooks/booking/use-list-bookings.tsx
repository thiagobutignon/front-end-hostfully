import { useEffect, useState } from 'react'

import { ListBookingsUsecase } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'

type useListBookingsResult = {
  bookings: ListBookingsUsecase.Result
  isLoading: boolean
  error: string
}

export const useListBookings = (
  listBookingsUsecase: ListBookingsUsecase
): useListBookingsResult => {
  const [bookings, setBookings] = useState([] as ListBookingsUsecase.Result)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleError = useErrorHandler((error: Error) => {
    setError(error.message)
  })

  useEffect(() => {
    setIsLoading(true)
    listBookingsUsecase
      .perform()
      .then(setBookings)
      .catch(handleError)
      .finally(() => {
        setIsLoading(false)
      })
  }, [listBookingsUsecase])

  return { bookings, isLoading, error }
}
