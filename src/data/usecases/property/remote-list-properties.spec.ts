import {
  InvalidCredentialError,
  NotFoundError,
  UnexpectedError
} from '@/domain/errors'

import { HttpClientSpy } from '@/data/mocks'
import { HttpStatusCode } from '@/data/protocols'
import { ListPropertiesUsecase } from '@/domain/usecases'
import { RemoteListProperties } from '@/data/usecases'
import { faker } from '@faker-js/faker'
import { listPropertiesMock } from '@/domain/mocks'

type SutTypes = {
  sut: RemoteListProperties
  httpClientSpy: HttpClientSpy
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<ListPropertiesUsecase.Result>()
  const sut = new RemoteListProperties(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteListProperties', () => {
  test('Should call httpClient with correct url, method, and body', async () => {
    const url = faker.internet.url()

    const { sut, httpClientSpy } = makeSut(url)

    await sut.perform()

    expect(httpClientSpy.url).toEqual(url)
    expect(httpClientSpy.method).toEqual('get')
  })

  test('Should return bookings data if httpClient returns 200', async () => {
    const result = listPropertiesMock()
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
