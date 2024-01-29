export interface CalculateNumberOfNights {
  execute: (params: CalculateNumberOfNights.Params) => number
}

export namespace CalculateNumberOfNights {
  export type Params = {
    startDate: Date
    endDate: Date
  }
}
