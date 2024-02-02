import { DatesCalculator } from '@/application/calculators'

export const makeDatesCalculator = (): DatesCalculator => {
  return new DatesCalculator()
}
