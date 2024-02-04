import { PropertyModel } from '@/domain/models'

export const realProperties: PropertyModel[] = [
  {
    id: '1',
    name: 'Seaside Escape',
    description:
      '"Seaside Escape is a magnificent beachfront house nestled in the serene ambiance of Malibu. This property stands as a beacon of luxury, offering breathtaking ocean views that create an endlessly peaceful backdrop. Spanning across a generous living space, the house boasts four elegantly designed bedrooms, each offering an unobstructed view of the shimmering sea. The interior is a blend of modern sophistication and coastal charm, featuring an open-plan living area that seamlessly connects to a sun-drenched patio. Outside, the sound of waves and the scent of salt air provide a tranquil escape from the hustle and bustle of daily life. The property is ideally located on Ocean Drive, granting easy access to the best that Malibu has to offer, from exquisite dining experiences to exclusive boutiques. Seaside Escape is more than just a house; its a haven for those seeking a luxurious, peaceful retreat by the sea."',
    location: {
      city: 'Malibu',
      number: '123',
      street: 'Ocean Drive',
      country: 'USA'
    },
    maxGuests: 8,
    bedrooms: 4,
    beds: 4,
    image: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    pricePerNight: 350,
    cleaningFee: 50,
    serviceFee: 30,
    roomType: 'House',
    status: 'Paid'
  },
  {
    id: '2',
    name: 'Urban Apartment',
    description:
      "Located at the heart of New York City on the bustling streets of Broadway, Urban Apartment epitomizes the essence of city living. This modern apartment, situated on the 900th block, is a stone's throw away from vibrant shopping districts and the city's pulsating nightlife. Inside, the apartment unfolds into a beautifully appointed living space, featuring two spacious bedrooms and a contemporary living area that captures the urban spirit. The design is a perfect blend of modern chic and functional elegance, with large windows that flood the space with natural light and offer stunning cityscape views. The location is unparalleled for those wanting to immerse themselves in the rich culture and energy of New York City. From Broadway shows to gourmet dining and iconic landmarks, everything is just a walk away. Urban Apartment is not just a place to stay; it's a gateway to experiencing the dynamic rhythm of city life at its best.",
    location: {
      city: 'New York',
      number: '900',
      country: 'USA',
      street: 'Broadway'
    },
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    image: ['image4.jpg', 'image5.jpg', 'image6.jpg'],
    pricePerNight: 200,
    cleaningFee: 30,
    serviceFee: 20,
    roomType: 'Apartment',
    status: 'Waiting for Payment'
  },
  {
    id: '3',
    name: 'Country Retreat',
    description:
      "Nestled in the heart of Napa’s lush countryside, Country Retreat is a charming property located on Vineyard Drive. This idyllic getaway is a harmonious blend of rustic charm and modern comfort. The house, surrounded by rolling hills and picturesque vineyards, offers a peaceful escape from the city's chaos. It features three cozy bedrooms, each thoughtfully designed to provide a serene and restful environment. The living area, with its warm tones and inviting decor, opens up to a scenic outdoor space where guests can enjoy the tranquil beauty of the countryside. The property is an ideal spot for those seeking a blend of relaxation and adventure. Nearby, guests can explore famous wineries, indulge in gourmet dining, or take leisurely walks through scenic trails. Country Retreat is more than just a vacation rental; it’s a slice of paradise, offering a unique opportunity to reconnect with nature and rejuvenate the soul.",
    location: {
      city: 'Napa',
      number: '123',
      country: 'USA',
      street: 'Vineyard Drive'
    },
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    image: ['image7.jpg', 'image8.jpg', 'image9.jpg'],
    pricePerNight: 150,
    cleaningFee: 20,
    serviceFee: 15,
    roomType: 'House',
    status: 'Completed'
  }
]
