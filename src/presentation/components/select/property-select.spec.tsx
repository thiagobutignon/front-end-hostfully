import { fireEvent, render, screen } from '@testing-library/react'

import { ListPropertiesUsecase } from '@/domain/usecases'
import PropertySelect from '@/presentation/components/select/property-select'

describe('PropertySelect Component', () => {
  let mockProperties: any
  let mockOnChange: any
  beforeEach(() => {
    mockProperties = [
      { id: '1', name: 'Property 1' },
      { id: '2', name: 'Property 2' }
    ]
    mockOnChange = jest.fn()
    render(
      <PropertySelect
        properties={mockProperties as ListPropertiesUsecase.Result}
        selectedPropertyId={mockProperties[0].id}
        onPropertyChange={mockOnChange}
      />
    )
  })
  it('should render options based on properties and handle selection change', () => {
    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '2' } })

    expect(mockOnChange).toHaveBeenCalled()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <PropertySelect
        properties={mockProperties as ListPropertiesUsecase.Result}
        selectedPropertyId={mockProperties[0].id}
        onPropertyChange={mockOnChange}
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
