import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { ErrorComponent } from '@/presentation/components'
import { ListBookingsUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { useErrorHandler } from '../hooks/property/use-error-handler'
import { usePropertiesContext } from '@/presentation/context/properties-context'

type Props = {
  listBookings: ListBookingsUsecase
}

export const BookingPage: React.FC<Props> = ({ listBookings }: Props) => {
  const {
    selectedProperty,
    error: errorProperties,
    isLoading: isLoadingProperties
  } = usePropertiesContext()

  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    listBookings: [] as ListBookingsUsecase.Result,
    reload: false,
    error: ''
  })

  const reload = (): void => {
    setState((old) => ({
      listBookings: [] as ListBookingsUsecase.Result,
      selectedPropertyId: '1',
      error: '',
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

  if (state.error || errorProperties) {
    return <ErrorComponent error={state.error} reload={reload} />
  }

  if (state.isLoading || isLoadingProperties) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      {selectedProperty && (
        <Box maxW="4xl" mx="auto" p={5} bg="backgroundz">
          {/* Property Image */}
          <Image
            // src={selectedProperty.image[0]}
            src={faker.image.urlLoremFlickr({ category: 'house' })}
            my={4}
            borderRadius="lg"
            w="100%"
          />

          {/* Property Title and Details */}
          <Heading as="h1" size="xl" fontWeight="bold" my={2}>
            {selectedProperty.name}
          </Heading>
          <Text fontWeight="bold" my={1}>
            Guests: {selectedProperty.maxGuests} | Bedrooms:{' '}
            {selectedProperty.bedrooms} | Beds: {selectedProperty.beds}
          </Text>
          <Text my={2}>{selectedProperty.description}</Text>

          {/* Pricing and Booking Details */}
          <Flex justifyContent="space-between" alignItems="center" my={4}>
            <Text fontWeight="bold" fontSize="2xl">
              ${selectedProperty.pricePerNight}/night
            </Text>

            <Button colorScheme="teal" px={8}>
              Book Now
            </Button>
          </Flex>
        </Box>
      )}
    </>
  )
}
