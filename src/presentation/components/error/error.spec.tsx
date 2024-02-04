import { fireEvent, render, screen } from '@testing-library/react'

import { ErrorComponent } from '@/presentation/components'

describe('ErrorComponent', () => {
  const errorMessage = 'An unexpected error occurred'
  const mockReload = jest.fn()

  beforeEach(() => {
    render(<ErrorComponent error={errorMessage} reload={mockReload} />)
  })

  test('renders the error message', () => {
    const errorText = screen.getByTestId('error')
    expect(errorText).toBeInTheDocument()
    expect(errorText).toHaveTextContent(errorMessage)
  })

  test('renders a button that can be clicked to reload', () => {
    const reloadButton = screen.getByTestId('reload')
    expect(reloadButton).toBeInTheDocument()
    fireEvent.click(reloadButton)
    expect(mockReload).toHaveBeenCalledTimes(1)
  })

  test('matches snapshot', () => {
    const { asFragment } = render(
      <ErrorComponent error={errorMessage} reload={mockReload} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
