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
  roomType: 'Room' | 'House' | 'Apartment' | 'Shared'
  status: 'Pending' | 'Cancelled' | 'Waiting for Payment' | 'Paid' | 'Completed'
}
