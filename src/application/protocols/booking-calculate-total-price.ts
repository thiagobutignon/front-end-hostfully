export interface BookingCalculateTotalPrice {
  execute: (params: BookingCalculateTotalPrice.Params) => BookingCalculateTotalPrice.Result
}

export namespace BookingCalculateTotalPrice {
  export type Params = {
    startDate: Date
    endDate: Date
    pricePerNight: string
  }
  export type Result = {
    numberOfNights: number
    totalPrice: string
  }
}
