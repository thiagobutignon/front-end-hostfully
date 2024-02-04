import { LocationModel } from '@/domain/models'

export type PropertyModel = {
  id: string
  name: string
  description: string
  location: LocationModel
  maxGuests: number
  bedrooms: number
  beds: number
  image: string[]
  pricePerNight: number
  cleaningFee: number
  serviceFee: number
  roomType: 'Room' | 'House' | 'Apartment' | 'Shared'
  status: 'Pending' | 'Cancelled' | 'Waiting for Payment' | 'Paid' | 'Completed'
}
