import React, { createContext, useContext } from 'react'

import { ListPropertiesUsecase } from '@/domain/usecases'
import { useProperties } from '@/presentation/hooks/property'

type PropertiesContextType = {
  properties: ListPropertiesUsecase.Result
  isLoading: boolean
  error: string
  selectedProperty: ListPropertiesUsecase.Result[0] | null
  handlePropertyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(
  undefined
)

export const usePropertiesContext = (): PropertiesContextType =>
  useContext(PropertiesContext)

type PropertiesProviderProps = {
  listProperties: ListPropertiesUsecase
  children: React.ReactNode
}

export const PropertiesProvider: React.FC<PropertiesProviderProps> = ({
  listProperties,
  children
}) => {
  const {
    properties,
    isLoading,
    error,
    selectedProperty,
    handlePropertyChange
  } = useProperties(listProperties)

  return (
    <PropertiesContext.Provider
      value={{
        properties,
        isLoading,
        error,
        selectedProperty,
        handlePropertyChange
      }}
    >
      {children}
    </PropertiesContext.Provider>
  )
}
