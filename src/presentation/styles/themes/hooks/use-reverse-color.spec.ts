import { useColorMode } from '@chakra-ui/react'
import { renderHook } from '@testing-library/react'
import { useReverseColor } from './use-reverse-color'

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useColorMode: jest.fn()
}))

describe('useReverseColor', () => {
  const mockUseColorMode = useColorMode as jest.Mock

  test('should return light mode colors when color mode is light', () => {
    mockUseColorMode.mockImplementation(() => ({ colorMode: 'light' }))

    const { result } = renderHook(() => useReverseColor())

    expect(result.current.background).toBe('#F0EBE6')
    expect(result.current.text).toBe('#5D5C61')
  })

  test('should return dark mode colors when color mode is dark', () => {
    mockUseColorMode.mockImplementation(() => ({ colorMode: 'dark' }))

    const { result } = renderHook(() => useReverseColor())

    expect(result.current.background).toBe('#F0EBE6')
    expect(result.current.text).toBe('#5D5C61')
  })
})
