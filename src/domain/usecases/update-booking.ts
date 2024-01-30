import { Booking } from '@/domain/models'

export interface UpdateBookingUsecase {
  perform: (params: UpdateBookingUsecase.Params) => Promise<UpdateBookingUsecase.Result>
}

export namespace UpdateBookingUsecase {
  export type Params = Booking.Model
  export type Result = Booking.Result
}
