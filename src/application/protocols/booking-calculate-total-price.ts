export interface BookingCalculateTotalPrice {
  execute: (params: BookingCalculateTotalPrice.Params) => BookingCalculateTotalPrice.Result
}

export namespace BookingCalculateTotalPrice {
  export type Params = {
    startDate: Date
    endDate: Date
    pricePerNight: number
    serviceFee?: number
    cleaningFee?: number
  }
  export type Result = {
    numberOfNights: number
    totalPrice: number
  }
}
