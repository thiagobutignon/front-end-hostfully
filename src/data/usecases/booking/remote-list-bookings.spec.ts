import { InvalidCredentialError, NotFoundError, UnexpectedError } from '@/domain/errors'

import { CreateBookingUsecase } from '@/domain/usecases'
import { HttpClientSpy } from '@/data/mocks'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteListBookings } from '@/data/usecases'
import { createBookingsResultMock } from '@/domain/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteListBookings
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<CreateBookingUsecase.Result>()
  const sut = new RemoteListBookings(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteListBookings', () => {
  test('Should call httpClient with correct url, method, and body', async () => {
    const url = faker.internet.url()

    const { sut, httpClientSpy } = makeSut(url)

    await sut.perform()

    expect(httpClientSpy.url).toEqual(url)
    expect(httpClientSpy.method).toEqual('get')
  })

  test('Should return bookings data if httpClient returns 200', async () => {
    const result = createBookingsResultMock()
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: result
    }

    const response = await sut.perform()

    expect(response).toEqual(result)
  })

  test('Should throw InvalidCredentialError if httpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const promise = sut.perform()

    await expect(promise).rejects.toThrow(new InvalidCredentialError())
  })

  test('Should throw UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.perform()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw NotFoundError if httpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.perform()

    await expect(promise).rejects.toThrow(new NotFoundError())
  })
})
