import { Guest, PropertyModel } from '@/domain/models'

export namespace Booking {
  export type Model = {
    id: string
    totalPrice: string
    numberOfNights: number
    startDate: Date
    endDate: Date
    hostEmail: string
    guests: Guest.Model
    property: PropertyModel
  }
  export type Params = {
    guestEmail: string
    guests: Guest.Model
    startDate: Date
    endDate: Date
    createdAt: Date
    property: PropertyModel
  }
  export type Result = {
    booking: Booking.Model[]
  }
}
