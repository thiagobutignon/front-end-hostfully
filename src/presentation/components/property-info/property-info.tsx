import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react'

import { PropertyModel } from '@/domain/models'
import React from 'react'

type PropertyInfoProps = {
  selectedProperty: PropertyModel
}

const PropertyInfoComponent: React.FC<PropertyInfoProps> = ({
  selectedProperty
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

        <Button bg="successButton" textColor="text" px={8}>
          Book Now
        </Button>
      </Flex>
    </Box>
  )
}
export default PropertyInfoComponent
