import { act, renderHook, waitFor } from '@testing-library/react'

import { ListPropertiesUsecase } from '@/domain/usecases'
import { listPropertiesMock } from '@/domain/mocks'
import { useProperties } from '@/presentation/hooks/property/use-properties'

describe('useProperties Hook', () => {
  let mockListPropertiesUsecase: jest.Mocked<ListPropertiesUsecase>

  beforeEach(() => {
    mockListPropertiesUsecase = {
      perform: jest.fn()
    }
  })

  it('should start with an initial loading state', () => {
    mockListPropertiesUsecase.perform.mockReturnValue(new Promise(() => {}))

    const { result } = renderHook(() =>
      useProperties(mockListPropertiesUsecase)
    )

    expect(result.current.isLoading).toBe(true)
  })

  it('should fetch properties successfully', async () => {
    const mock = listPropertiesMock()
    mockListPropertiesUsecase.perform.mockResolvedValue(mock)

    const { result } = renderHook(() =>
      useProperties(mockListPropertiesUsecase)
    )

    await waitFor(() => {
      expect(mockListPropertiesUsecase.perform).toHaveBeenCalled()
      expect(result.current.properties).toEqual(mock)
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBe('')
    })

    expect(result.current.isLoading).toBe(false)
  })

  it('should handle errors', async () => {
    const errorMessage = 'An error occurred'
    mockListPropertiesUsecase.perform.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() =>
      useProperties(mockListPropertiesUsecase)
    )

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should update the selected property based on selectedPropertyId', async () => {
    const mock = listPropertiesMock()
    mockListPropertiesUsecase.perform.mockResolvedValue(mock)

    const { result } = renderHook(() =>
      useProperties(mockListPropertiesUsecase)
    )

    await waitFor(() => {
      expect(result.current.properties).toEqual(mock)
    })

    act(() => {
      result.current.handlePropertyChange({
        target: { value: mock[1].id }
      } as React.ChangeEvent<HTMLSelectElement>)
    })

    expect(result.current.selectedProperty).toEqual(mock[1])
  })

  it('should update selectedPropertyId when handlePropertyChange is called', async () => {
    const mock = listPropertiesMock()
    mockListPropertiesUsecase.perform.mockResolvedValue(mock)

    const { result } = renderHook(() =>
      useProperties(mockListPropertiesUsecase)
    )

    await waitFor(() => {
      expect(result.current.properties).toEqual(mock)
    })

    const newSelectedId = mock[1].id
    act(() => {
      result.current.handlePropertyChange({
        target: { value: newSelectedId }
      } as React.ChangeEvent<HTMLSelectElement>)
    })
    expect(result.current.properties[1].id).toBe(newSelectedId)
  })
})
