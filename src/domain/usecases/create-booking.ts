import { Booking } from '@/domain/models'

export interface CreateBookingUsecase {
  perform: (params: CreateBookingUsecase.Params) => Promise<CreateBookingUsecase.Result>
}

export namespace CreateBookingUsecase {
  export type Params = Booking.Params
  export type Result = Booking.Result
}
