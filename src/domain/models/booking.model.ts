import { Guest, PropertyModel } from '@/domain/models'

export namespace Booking {
  export type Model = {
    id: string
    totalPrice: number
    numberOfNights: number
    startDate: Date
    endDate: Date
    hostEmail: string
    guests: Guest.Model
    property: PropertyModel
    guestEmail: string
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
    booking?: Booking.Model[]
    error?: string
  }
}
