export namespace Guest {
  export type Model = {
    numberOfGuests: number
    guests: Guest.Info[]
  }
  export type Info = {
    name: string
    email: string
  }
}
