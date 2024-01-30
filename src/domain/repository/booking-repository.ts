import { Booking } from '@/domain/models'
import { CreateBookingUsecase } from '@/domain/usecases'

export interface BookingRepository {
  add: (params: BookingRepository.Params) => BookingRepository.Result
  getAll: () => BookingRepository.Result
}

export namespace BookingRepository {
  export type Params = Booking.Model
  export type Result = CreateBookingUsecase.Result['booking']
}
