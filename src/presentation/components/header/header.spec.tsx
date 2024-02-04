import { render, waitFor } from '@testing-library/react'

import { HeaderComponent } from '@/presentation/components'
import { ListPropertiesUsecase } from '@/domain/usecases'
import { PropertiesProvider } from '@/presentation/context'

describe('HeaderComponent', () => {
  let listPropertiesSpy: jest.Mocked<ListPropertiesUsecase>

  beforeEach(() => {
    listPropertiesSpy = {
      perform: jest.fn().mockResolvedValue({ id: '1', name: 'any_name' })
    }
  })
  it('renders correctly', async () => {
    const { getByText, getByTestId } = render(
      <PropertiesProvider listProperties={listPropertiesSpy}>
        <HeaderComponent listProperties={listPropertiesSpy} />
      </PropertiesProvider>
    )
    waitFor(() => {
      expect(getByText('Hostfully')).toBeInTheDocument()
      expect(getByTestId('mock-theme-mode-component')).toBeInTheDocument()
    })
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <PropertiesProvider listProperties={listPropertiesSpy}>
        <HeaderComponent listProperties={listPropertiesSpy} />
      </PropertiesProvider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
