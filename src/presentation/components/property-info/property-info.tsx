import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

import { PropertyModel } from '@/domain/models'
import React from 'react'

type PropertyInfoProps = {
  selectedProperty: PropertyModel
  children?: React.ReactNode
}

const PropertyInfoComponent: React.FC<PropertyInfoProps> = ({
  selectedProperty,
  children
}) => {
  return (
    <Box maxW="4xl" mx="auto" p={5} bg="background">
      <Image
        src={selectedProperty.image[0]}
        my={4}
        borderRadius="lg"
        w="100%"
      />

      <Heading as="h1" size="xl" fontWeight="bold" my={2}>
        {selectedProperty.name}
      </Heading>
      <Text fontWeight="bold" my={1}>
        Guests: {selectedProperty.maxGuests} | Bedrooms:{' '}
        {selectedProperty.bedrooms} | Beds: {selectedProperty.beds}
      </Text>
      <Text my={2}>{selectedProperty.description}</Text>

      <Flex justifyContent="space-between" alignItems="center" my={4}>
        <Text fontWeight="bold" fontSize="2xl">
          ${selectedProperty.pricePerNight}/night
        </Text>
        <Text fontWeight="bold" fontSize="2xl">
          Cleaning Fee: ${selectedProperty.cleaningFee}/
        </Text>
        <Text fontWeight="bold" fontSize="2xl">
          Service Fee: ${selectedProperty.serviceFee}/
        </Text>
      </Flex>
      {children}
    </Box>
  )
}
export default PropertyInfoComponent
