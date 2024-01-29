import { Booking } from '@/domain/models'

export interface ListBookingsUsecase {
  perform: () => Promise<ListBookingsUsecase.Result>
}

export namespace ListBookingsUsecase {
  export type Result = Booking.Result
}
