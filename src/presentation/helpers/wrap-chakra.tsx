import { ChakraProvider, ChakraProviderProps } from '@chakra-ui/react'
import { RenderResult, render } from '@testing-library/react'

export const WrapChakra = ({ children }: ChakraProviderProps): RenderResult => {
  return render(<ChakraProvider>{children}</ChakraProvider>)
}
