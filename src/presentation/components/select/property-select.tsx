import { ListPropertiesUsecase } from '@/domain/usecases'
import React from 'react'
import { Select } from '@chakra-ui/react'

type PropertySelectProps = {
  properties: ListPropertiesUsecase.Result
  selectedPropertyId: string
  onPropertyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const PropertySelect: React.FC<PropertySelectProps> = ({
  properties,
  selectedPropertyId,
  onPropertyChange
}) => {
  return (
    <Select
      value={selectedPropertyId}
      onChange={onPropertyChange}
      placeholder="Select a property"
      textColor="text"
      bg="background"
      my={4}
    >
      {properties.map((property) => (
        <option key={property.id} value={property.id} color="reverseBackground">
          {property.name}
        </option>
      ))}
    </Select>
  )
}

export default PropertySelect
