import { Booking } from '@/domain/models'
import { CreateBookingUsecase } from '@/domain/usecases'

export interface BookingRepository {
  add: (params: BookingRepository.Params) => BookingRepository.Result
  getAll: () => BookingRepository.Result
  update: (params: BookingRepository.Params) => BookingRepository.UpdateResult
}

export namespace BookingRepository {
  export type Params = Booking.Model
  export type Result = CreateBookingUsecase.Result['booking']
  export type UpdateResult = Booking.Result
}
