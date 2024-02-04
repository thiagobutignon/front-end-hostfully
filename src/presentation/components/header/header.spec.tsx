import { HeaderComponent } from '@/presentation/components'
import { render } from '@testing-library/react'

describe('HeaderComponent', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<HeaderComponent />)

    expect(getByText('Hostfully')).toBeInTheDocument()
    expect(getByTestId('mock-theme-mode-component')).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<HeaderComponent />)
    expect(asFragment()).toMatchSnapshot()
  })
})
