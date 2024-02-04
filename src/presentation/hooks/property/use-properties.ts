import { useEffect, useState } from 'react'

import { ListPropertiesUsecase } from '@/domain/usecases'

type usePropertiesResult = {
  properties: ListPropertiesUsecase.Result
  isLoading: boolean
  error: string
  selectedProperty: ListPropertiesUsecase.Result[0] | null
  handlePropertyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const useProperties = (
  listPropertiesUsecase: ListPropertiesUsecase
): usePropertiesResult => {
  const [properties, setProperties] = useState(
    [] as ListPropertiesUsecase.Result
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedPropertyId, setSelectedPropertyId] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    listPropertiesUsecase
      .perform()
      .then(setProperties)
      .catch((e) => {
        setError(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [listPropertiesUsecase])

  useEffect(() => {
    setSelectedProperty(
      properties.find((property) => property.id === selectedPropertyId) || null
    )
  }, [selectedPropertyId, properties])

  const handlePropertyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedPropertyId(event.target.value)
  }

  return {
    properties,
    isLoading,
    error,
    selectedProperty,
    handlePropertyChange
  }
}
