import { DateFnsAdapter } from '@/infra/date'

export const makeDateFnsAdapter = (): DateFnsAdapter => {
  return new DateFnsAdapter()
}
