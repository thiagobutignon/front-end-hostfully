import '@testing-library/jest-dom'

import { RenderResult, render } from '@testing-library/react'

import { FormControl } from '@chakra-ui/react'
import { InputError } from '@/presentation/components'

const makeSut = (props?: any): RenderResult => {
  return render(
    <FormControl>
      <InputError {...props}>Error message</InputError>
    </FormControl>
  )
}

describe('InputError', () => {
  test('renders InputError correctly', () => {
    const { getByText } = makeSut()

    expect(getByText('Error message')).toBeInTheDocument()
  })

  test('applies the correct styles', () => {
    const { getByText } = makeSut()

    const inputErrorElement = getByText('Error message')

    expect(inputErrorElement).toHaveStyle({ color: 'error' })
  })

  test('matches snapshot', () => {
    const { asFragment } = render(
      <FormControl>
        <InputError>Error message</InputError>
      </FormControl>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
