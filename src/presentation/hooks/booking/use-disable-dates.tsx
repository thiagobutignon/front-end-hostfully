import { addDays, eachDayOfInterval } from 'date-fns'
import { useEffect, useState } from 'react'

import { Booking } from '@/domain/models'

export const useDisabledDates = (
  bookings: Booking.Model[],
  reloadFlag: boolean
): Date[] => {
  const [disabledDates, setDisabledDates] = useState<Date[]>([])

  useEffect(() => {
    if (bookings.length > 0) {
      const newDisabledDates = bookings.flatMap(({ startDate, endDate }) =>
        eachDayOfInterval({
          start: addDays(new Date(startDate), 1),
          end: addDays(new Date(endDate), 1)
        })
      )

      setDisabledDates(newDisabledDates)
    }
  }, [reloadFlag])

  return disabledDates
}
