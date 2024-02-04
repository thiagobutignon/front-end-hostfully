import {
  ErrorComponent,
  PropertyInfoComponent
} from '@/presentation/components'
import React, { useState } from 'react'

import { ListBookingsUsecase } from '@/domain/usecases'
import { Text } from '@chakra-ui/react'
import { useListBookings } from '@/presentation/hooks'
import { usePropertiesContext } from '@/presentation/context'

type Props = {
  listBookings: ListBookingsUsecase
}

export const BookingPage: React.FC<Props> = ({ listBookings }: Props) => {
  const [reloadFlag, setReloadFlag] = useState(false)
  const {
    selectedProperty,
    error: errorProperties,
    isLoading: isLoadingProperties
  } = usePropertiesContext()

  const {
    bookings,
    isLoading: listBookingIsLoading,
    error: listBookingError
  } = useListBookings(listBookings, reloadFlag)

  const reload = (): void => {
    setReloadFlag((oldFlag) => !oldFlag)
  }
  const error = errorProperties || listBookingError
  if (error) {
    return <ErrorComponent error={error} reload={reload} />
  }

  if (listBookingIsLoading || isLoadingProperties) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <Text>{JSON.stringify(bookings)}</Text>
      {selectedProperty && (
        <PropertyInfoComponent selectedProperty={selectedProperty} />
      )}
    </>
  )
}
