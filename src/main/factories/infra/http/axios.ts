import { AxiosHttpClient } from "@/infra"

export const makeAxios = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}