import { fireEvent, screen } from '@testing-library/react'

type FieldDescriptor = {
  testId: string
  value: string
}

export const populateFormFields = async (fields: FieldDescriptor[]): Promise<void> => {
  for (const { testId, value } of fields) {
    const fieldInput = screen.getByTestId(testId)
    fireEvent.input(fieldInput, { target: { value } })
  }
}
