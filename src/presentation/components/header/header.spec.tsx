import { render, waitFor } from '@testing-library/react'

import { HeaderComponent } from '@/presentation/components'
import { ListPropertiesUsecase } from '@/domain/usecases'

describe('HeaderComponent', () => {
  let listPropertiesSpy: jest.Mocked<ListPropertiesUsecase>

  beforeEach(() => {
    listPropertiesSpy = {
      perform: jest.fn().mockResolvedValue({ id: '1', name: 'any_name' })
    }
  })
  it('renders correctly', async () => {
    const { getByText, getByTestId } = render(
      <HeaderComponent listProperties={listPropertiesSpy} />
    )
    waitFor(() => {
      expect(getByText('Hostfully')).toBeInTheDocument()
      expect(getByTestId('mock-theme-mode-component')).toBeInTheDocument()
    })
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <HeaderComponent listProperties={listPropertiesSpy} />
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
