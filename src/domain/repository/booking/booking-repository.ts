import { Booking } from '@/domain/models'
import { CreateBookingUsecase } from '@/domain/usecases'

export interface BookingRepository {
  add: (params: BookingRepository.Params) => BookingRepository.Result
  getAll: () => BookingRepository.Result
  update: (params: Partial<BookingRepository.Params>) => BookingRepository.UpdateResult
  delete: (params: BookingRepository.DeleteParams) => BookingRepository.DeleteResult
}

export namespace BookingRepository {
  export type Params = Booking.Model
  export type Result = CreateBookingUsecase.Result['booking']
  export type UpdateResult = Booking.Result
  export type DeleteParams = { id: string }
  export type DeleteResult = boolean
}
