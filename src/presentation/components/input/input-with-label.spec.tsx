import { RenderResult, fireEvent, render } from '@testing-library/react'

import { InputWithLabel } from '@/presentation/components'

describe('InputWithLabel', () => {
  const initialState = {
    myInput: '',
    myInputError: 'Error message'
  }
  const setState = jest.fn()
  const makeSut = (state: any = initialState): RenderResult => {
    return render(
      <InputWithLabel
        type="text"
        state={state}
        setState={setState}
        name="myInput"
      >
        My Label
      </InputWithLabel>
    )
  }

  test('should render with label and input', () => {
    const { getByTestId, getByRole } = makeSut()
    expect(getByTestId('myInput-label')).toHaveTextContent('My Label')
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  test('should call setState on input change', () => {
    const { getByRole } = makeSut()
    const input = getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })
    expect(setState).toHaveBeenCalledWith({
      ...initialState,
      myInput: 'new value'
    })
  })

  test('should display error if present in state', () => {
    const errorState = {
      myInput: '',
      myInputError: 'Error message'
    }
    const { getByTestId } = makeSut(errorState)
    const errorMessage = getByTestId('myInput-error')
    expect(errorMessage).toHaveTextContent('Error message')
  })

  test('matches snapshot', () => {
    const { asFragment } = render(
      <InputWithLabel
        type="text"
        state={initialState}
        setState={setState}
        name="myInput"
      >
        My Label
      </InputWithLabel>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
