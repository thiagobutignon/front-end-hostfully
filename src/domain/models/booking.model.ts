import { GuestModel, PropertyModel } from '@/domain/models'

export namespace Booking {
  export type Model = {
    id: string
    totalPrice: string
    startDate: Date
    endDate: Date
    hostEmail: string
    guests: GuestModel
  }
  export type Params = {
    hostEmail: string
    propertyId: string
    guests: GuestModel
    startDate: Date
    endDate: Date
    createdAt: Date
    property: PropertyModel
  }
  export type Result = {
    booking: Booking.Model[]
  }
}
