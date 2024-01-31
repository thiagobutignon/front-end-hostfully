import { NotFoundError, UnexpectedError } from '@/domain/errors'

import { DeleteBookingByIdUsecase } from '@/domain/usecases'
import { HttpClientSpy } from '@/data/mocks'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteDeleteBookingById } from '@/data/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteDeleteBookingById
  httpClientSpy: HttpClientSpy<DeleteBookingByIdUsecase.Result>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<DeleteBookingByIdUsecase.Result>()
  const sut = new RemoteDeleteBookingById(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteDeleteBookingById', () => {
  test('Should call HttpClient with correct URL, method, and body', async () => {
    const url = faker.internet.url()
    const params = { id: faker.string.alphanumeric() }
    const { sut, httpClientSpy } = makeSut(url)

    await sut.perform(params)

    expect(httpClientSpy.url).toEqual(`${url}/${params.id}`)
    expect(httpClientSpy.method).toEqual('delete')
    expect(httpClientSpy.body).toEqual(params)
  })

  test('Should return booking data if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: true
    }

    const response = await sut.perform({ id: faker.string.alphanumeric() })

    expect(response).toEqual(true)
  })

  test('Should throw NotFoundError if httpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.perform({ id: faker.string.alphanumeric() })

    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  test('Should throw UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.perform({ id: faker.string.alphanumeric() })

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
