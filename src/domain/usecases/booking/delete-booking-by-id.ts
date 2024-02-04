export interface DeleteBookingByIdUsecase {
  perform: (params: DeleteBookingByIdUsecase.Params) => Promise<DeleteBookingByIdUsecase.Result>
}

export namespace DeleteBookingByIdUsecase {
  export type Params = { id: string }
  export type Result = boolean | { error: string }
}
