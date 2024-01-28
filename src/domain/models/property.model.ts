import { LocationModel } from '@/domain/models'

export type PropertyModel = {
  id: string
  name: string
  location: LocationModel
  maxGuests: number
  bedrooms: number
  beds: number
  image: string[]
  pricePerNight: string
  cleaningFee: string
  serviceFee: string
  roomType: string
  status: 'Pending' | 'Cancelled' | 'Waiting for Payment' | 'Paid' | 'Completed'
}
