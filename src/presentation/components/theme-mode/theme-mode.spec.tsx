import { fireEvent, render } from '@testing-library/react'

import { ThemeModeComponent } from '@/presentation/components'
import { useColorMode } from '@chakra-ui/react'

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useColorMode: jest.fn()
}))

describe('ThemeModeComponent', () => {
  beforeEach(() => {
    ;(useColorMode as jest.Mock).mockImplementation(() => ({
      colorMode: 'light',
      toggleColorMode: jest.fn()
    }))
  })
  it('renders correctly', () => {
    const { getByText } = render(<ThemeModeComponent />)
    expect(getByText(/Dark/i)).toBeInTheDocument()
  })

  it('displays the correct icon for each theme', () => {
    const { getByTestId } = render(<ThemeModeComponent />)
    expect(getByTestId('moon-icon')).toBeInTheDocument()
    ;(useColorMode as jest.Mock).mockImplementation(() => ({
      colorMode: 'dark',
      toggleColorMode: jest.fn()
    }))

    const { getByTestId: getByTestIdForDark } = render(<ThemeModeComponent />)
    expect(getByTestIdForDark('sun-icon')).toBeInTheDocument()
  })
  it('toggles the theme mode on button click', () => {
    const toggleColorMode = jest.fn()
    ;(useColorMode as jest.Mock).mockImplementation(() => ({
      colorMode: 'light',
      toggleColorMode
    }))

    const { getByText } = render(<ThemeModeComponent />)
    fireEvent.click(getByText(/Dark/i))

    expect(toggleColorMode).toHaveBeenCalledTimes(1)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<ThemeModeComponent />)
    expect(asFragment()).toMatchSnapshot()
  })
})
