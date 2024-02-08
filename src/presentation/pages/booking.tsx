import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import {
  BookingForm,
  ErrorComponent,
  PropertyInfoComponent
} from '@/presentation/components'
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Icon,
  SimpleGrid,
  Text,
  useToast
} from '@chakra-ui/react'
import {
  CreateBookingUsecase,
  DeleteBookingByIdUsecase,
  ListBookingsUsecase,
  UpdateBookingUsecase
} from '@/domain/usecases'
import React, { useState } from 'react'
import { useDeleteBooking, useListBookings } from '@/presentation/hooks'

import { Booking } from '@/domain/models'
import BookingCardComponent from '@/presentation/components/card/booking-card'
import { MdReceipt } from 'react-icons/md'
import { Validation } from '@/validation/protocols'
import { usePropertiesContext } from '@/presentation/context'

type Props = {
  listBookings: ListBookingsUsecase
  validation: Validation
  createBooking: CreateBookingUsecase
  deleteBooking: DeleteBookingByIdUsecase
  updateBooking: UpdateBookingUsecase
}

export const BookingPage: React.FC<Props> = ({
  listBookings,
  validation,
  createBooking,
  deleteBooking,
  updateBooking
}: Props) => {
  const toast = useToast()
  const [open, setOpen] = useState(false)
  const [reloadFlag, setReloadFlag] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking.Model | null>(
    null
  )

  const {
    selectedProperty,
    error: errorProperties,
    isLoading: isLoadingProperties
  } = usePropertiesContext()

  const {
    bookings,
    isLoading: listBookingIsLoading,
    error: listBookingError
  } = useListBookings(listBookings, reloadFlag)

  const handleBookingSubmitted = (): void => {
    setReloadFlag((oldFlag) => !oldFlag)
    toast({
      title: 'Booking created.',
      description: 'Your booking has been successfully created.',
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }

  const handleUpdateBooking = (booking: Booking.Model): void => {
    setSelectedBooking(booking)
    toast({
      title: 'Booking updated.',
      description: 'Your booking has been successfully updated.',
      status: 'success',
      duration: 3000,
      isClosable: true
    })
  }

  const onUpdateCompleted = (): void => {
    setSelectedBooking(null)
  }

  const { performDelete } = useDeleteBooking(deleteBooking)

  const handleDeleteBooking = async (id: string): Promise<void> => {
    const result = await performDelete(id)
    if (result === true) {
      setReloadFlag((oldFlag) => !oldFlag)
      toast({
        title: 'Booking deleted.',
        description: 'The booking has been successfully deleted.',
        status: 'warning',
        duration: 3000,
        isClosable: true
      })
    }
  }

  const error = errorProperties || listBookingError
  if (error) {
    return (
      <ErrorComponent
        error={error}
        reload={() => {
          setReloadFlag((oldFlag) => !oldFlag)
        }}
      />
    )
  }

  if (listBookingIsLoading || isLoadingProperties) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      {selectedProperty && (
        <>
          <Button
            position={'fixed'}
            bottom={0}
            right={0}
            mr={2}
            mb={2}
            bg={'successButton'}
            onClick={() => {
              setOpen(true)
            }}
            zIndex={999}
          >
            <Icon as={MdReceipt} boxSize={6} />
          </Button>
          <PropertyInfoComponent selectedProperty={selectedProperty}>
            <BookingForm
              data-testid="booking-form"
              createBooking={createBooking}
              listBookings={listBookings}
              onBookingSubmitted={handleBookingSubmitted}
              reloadFlag={reloadFlag}
              validation={validation}
              updateBooking={updateBooking}
              initialBooking={selectedBooking}
              onUpdateCompleted={onUpdateCompleted}
            />
          </PropertyInfoComponent>
          <Drawer
            isOpen={open}
            placement="right"
            onClose={() => {
              setOpen(false)
            }}
            size={{ base: 'sm', md: 'lg' }}
          >
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Bookings</DrawerHeader>
              <DrawerBody>
                {bookings.booking.length === 0 ? (
                  <Text>No bookings found</Text>
                ) : (
                  <SimpleGrid
                    data-testid="booking-grid"
                    columns={[1]}
                    spacing="40px"
                    mt={4}
                    padding={2}
                  >
                    {bookings.booking.map((booking) => (
                      <BookingCardComponent
                        booking={booking}
                        key={booking.id}
                        onDelete={() => {
                          handleDeleteBooking(booking.id)
                          setOpen(false)
                        }}
                        onUpdate={() => {
                          handleUpdateBooking(booking)
                          setOpen(false)
                        }}
                      />
                    ))}
                  </SimpleGrid>
                )}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </>
  )
}
