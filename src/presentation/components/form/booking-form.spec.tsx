import { CreateBookingUsecase, ListBookingsUsecase } from '@/domain/usecases'
import { act, fireEvent, render } from '@testing-library/react'

import { BookingForm } from '@/presentation/components'
import { Validation } from '@/validation/protocols'
import { ChakraProvider } from '@chakra-ui/react'
import { clear } from 'console'

const mockedDate = new Date('2024-02-05')

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react')

  return {
    ...originalModule,
    useBreakpointValue: jest.fn(() => 2)
  }
})

jest.mock('@/presentation/context', () => ({
  usePropertiesContext: jest.fn(() => ({
    selectedProperty: {
      id: '1',
      name: 'Test Property'
    }
  }))
}))

jest.mock('@/presentation/hooks/booking/use-list-bookings', () => ({
  useListBookings: jest.fn(() => ({
    bookings: { booking: [] },
    isLoading: false,
    error: null
  }))
}))
describe('BookingForm', () => {
  const mockCreateBooking: jest.Mocked<CreateBookingUsecase> = {
    perform: jest.fn()
  }
  const mockListBookings: jest.Mocked<ListBookingsUsecase> = {
    perform: jest.fn()
  }
  const mockValidation: jest.Mocked<Validation> = {
    validate: jest.fn()
  }
  const onBookingSubmitted = jest.fn()

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date(mockedDate))
  })

  beforeEach(() => {
    global.innerWidth = 1024
    global.dispatchEvent(new Event('resize'))
    jest.useFakeTimers().setSystemTime(new Date(mockedDate))
  })

  afterAll(() => {
    clear()
  })

  it('renders correctly with initial state', () => {
    const { getByTestId } = render(
      <ChakraProvider>
        <BookingForm
          reloadFlag={false}
          listBookings={mockListBookings}
          validation={mockValidation}
          createBooking={mockCreateBooking}
          onBookingSubmitted={onBookingSubmitted}
        />
      </ChakraProvider>
    )

    expect(getByTestId('form')).toBeInTheDocument()
  })

  it('submits form with correct data', async () => {
    const { getByTestId, getByLabelText } = render(
      <BookingForm
        reloadFlag={false}
        listBookings={mockListBookings}
        validation={mockValidation}
        createBooking={mockCreateBooking}
        onBookingSubmitted={onBookingSubmitted}
      />
    )

    await act(async () => {
      fireEvent.change(getByTestId('guestEmail'), {
        target: { value: 'test@example.com' }
      })
      fireEvent.change(getByLabelText('Number of Guests:'), {
        target: { value: '1' }
      })

      fireEvent.submit(getByTestId('form'))
    })

    expect(mockCreateBooking.perform).toHaveBeenCalledTimes(1)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <ChakraProvider>
        <BookingForm
          reloadFlag={false}
          listBookings={mockListBookings}
          validation={mockValidation}
          createBooking={mockCreateBooking}
          onBookingSubmitted={onBookingSubmitted}
        />
      </ChakraProvider>
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
