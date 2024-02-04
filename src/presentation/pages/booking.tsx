import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { ErrorComponent } from '@/presentation/components'
import { ListBookingsUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

type CallBackType = (error: Error) => void
type ResultType = CallBackType

export const useErrorHandler = (callback: CallBackType): ResultType => {
  return (error: Error): void => {
    callback(error)
  }
}

type Props = {
  listBookings: ListBookingsUsecase
}

export const BookingPage: React.FC<Props> = ({ listBookings }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    listBookings: [] as ListBookingsUsecase.Result,
    reload: false,
    error: 'AAAAA'
  })

  const reload = (): void => {
    setState((old) => ({
      listBookings: [] as ListBookingsUsecase.Result,
      error: 'AAAA',
      reload: !old.reload,
      isFormInvalid: true,
      isLoading: true
    }))
  }

  const handleError = useErrorHandler((error: Error) => {
    setState((old) => ({ ...old, error: error.message }))
  })

  useEffect(() => {
    listBookings
      .perform()
      .then((bookings) => {
        setState((old) => ({
          ...old,
          listBookings: bookings,
          isLoading: false
        }))
      })
      .catch(handleError)
  }, [state.reload])

  if (state.error) {
    return <ErrorComponent error={state.error} reload={reload} />
  }

  return (
    <>
      <Box maxW="4xl" mx="auto" p={5} bg="backgroundz">
        {/* Property Image */}
        <Image src={faker.image.urlPicsumPhotos()} my={4} borderRadius="lg" />

        {/* Property Title and Details */}
        <Heading as="h1" size="xl" fontWeight="bold" my={2}>
          Beautiful Beachfront Villa
        </Heading>
        <Text fontWeight="bold" my={1}>
          Guests: 8 | Bedrooms: 3 | Bathrooms: 2
        </Text>
        <Text my={2}>
          This luxurious villa is a beachfront paradise offering stunning views
          and direct beach access. Perfect for a family vacation or a romantic
          getaway.
        </Text>

        {/* Pricing and Booking Details */}
        <Flex justifyContent="space-between" alignItems="center" my={4}>
          <Text fontWeight="bold" fontSize="2xl">
            $350/night
          </Text>

          <Button colorScheme="teal" px={8}>
            Continue
          </Button>
        </Flex>
      </Box>
    </>
  )
}
