import { NotFoundError, UnexpectedError } from '@/domain/errors'
import { bookingModelMock, createBookingsResultMock } from '@/domain/mocks'

import { HttpClientSpy } from '@/data/mocks'
import { HttpStatusCode } from '@/data/protocols'
import { RemoteUpdateBooking } from '@/data/usecases'
import { UpdateBookingUsecase } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteUpdateBooking
  httpClientSpy: HttpClientSpy<UpdateBookingUsecase.Result>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<UpdateBookingUsecase.Result>()
  const sut = new RemoteUpdateBooking(url, httpClientSpy)

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteUpdateBooking', () => {
  test('Should call HttpClient with correct URL, method, and body', async () => {
    const url = faker.internet.url()
    const params = bookingModelMock()
    const { sut, httpClientSpy } = makeSut(url)

    await sut.perform(params)

    expect(httpClientSpy.url).toEqual(`${url}/${params.id}`)
    expect(httpClientSpy.method).toEqual('put')
    expect(httpClientSpy.body).toEqual(params)
  })

  test('Should return booking data if HttpClient returns 200', async () => {
    const result = createBookingsResultMock()
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: result
    }

    const response = await sut.perform(bookingModelMock())

    expect(response).toEqual(result)
  })

  test('Should throw NotFoundError if httpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.perform(bookingModelMock())

    await expect(promise).rejects.toThrow(new NotFoundError())
  })

  test('Should throw UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut()
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.perform(bookingModelMock())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
