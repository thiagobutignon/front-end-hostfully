import { RenderResult, fireEvent, render } from '@testing-library/react'

import { GuestsFormComponent } from '@/presentation/components'

jest.mock('@/presentation/styles/themes', () => ({
  useReverseColor: () => ({ text: 'black' })
}))

describe('GuestsFormComponent', () => {
  let mockOnGuestInfoChange: any
  let sut: RenderResult

  beforeEach(() => {
    mockOnGuestInfoChange = jest.fn()
    sut = render(
      <GuestsFormComponent
        guests={{
          numberOfGuests: 2,
          guests: [
            { name: '', email: '' },
            { name: '', email: '' }
          ]
        }}
        onGuestInfoChange={mockOnGuestInfoChange}
      />
    )
  })

  it('renders correctly with initial state', () => {
    const { getAllByTestId } = sut

    expect(getAllByTestId('input-email-0')[0]).toBeInTheDocument()
    expect(getAllByTestId('input-name-0')[0]).toBeInTheDocument()
  })

  it('calls onGuestInfoChange with correct values on input change', () => {
    const { getAllByTestId } = sut

    const nameInput = getAllByTestId('input-name-0')[0]
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    expect(mockOnGuestInfoChange).toHaveBeenNthCalledWith(1, 0, {
      name: 'John Doe',
      email: ''
    })

    const emailInput = getAllByTestId('input-email-0')[0]
    fireEvent.change(emailInput, { target: { value: 'johndoe@email.com' } })

    expect(mockOnGuestInfoChange).toHaveBeenNthCalledWith(2, 0, {
      name: 'John Doe',
      email: 'johndoe@email.com'
    })
  })

  test('matches snapshot', () => {
    const { asFragment } = sut

    expect(asFragment()).toMatchSnapshot()
  })
})
