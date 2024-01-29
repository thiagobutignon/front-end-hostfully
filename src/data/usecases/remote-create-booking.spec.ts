import { InvalidCredentialError, NotFoundError, UnexpectedError } from '@/domain/errors'
import { createBookindResultMock, createBookingParamsMock } from '@/domain/mocks'

import { CreateBookingUsecase } from '@/domain/usecases'
import { HttpClientSpy } from '@/data/mocks'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteCreateBooking } from '@/data/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteCreateBooking
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<CreateBookingUsecase.Result>()
  const sut = new RemoteCreateBooking(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteCreateBooking', () => {
  test('Should call httpClient with correct url, method, and body', async () => {
    const url = faker.internet.url()
    const params = createBookingParamsMock()
    const { sut, httpClientSpy } = makeSut(url)

    await sut.perform(params)

    expect(httpClientSpy.url).toEqual(url)
    expect(httpClientSpy.method).toEqual('post')
    expect(httpClientSpy.body).toEqual(params)
  })

  test('Should return booking data if httpClient returns 200', async () => {
    const result = createBookindResultMock()
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: result
    }

    const response = await sut.perform(createBookingParamsMock())

    expect(response).toEqual(result)
  })

  test('Should throw InvalidCredentialError if httpClient returns 401', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }

    const promise = sut.perform(createBookingParamsMock())

    await expect(promise).rejects.toThrow(new InvalidCredentialError())
  })

  test('Should throw UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.perform(createBookingParamsMock())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw NotFoundError if httpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.perform(createBookingParamsMock())

    await expect(promise).rejects.toThrow(new NotFoundError())
  })
})
