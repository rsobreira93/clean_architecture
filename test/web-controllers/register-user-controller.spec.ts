import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@/use-cases/register-user-on-mailing-list/repositories/in-memory/in-memory-users-repository'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/web-controllers/interfaces'

import { RegisterUserController } from '@/web-controllers/register-use-controller'

describe('Register user web controller', () => {
  test('should return stats code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@mail.com'
      }
    }

    const users: UserData[] = []
    const usersRepository = new InMemoryUserRepository(users)
    const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
    const controller: RegisterUserController = new RegisterUserController(registerUserOnMailingList)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })

  test('should return stats code 400 when request contains invalid name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'J',
        email: 'johndoe@mail.com'
      }
    }

    const users: UserData[] = []
    const usersRepository = new InMemoryUserRepository(users)
    const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
    const controller: RegisterUserController = new RegisterUserController(registerUserOnMailingList)
    const response: HttpResponse = await controller.handle(requestWithInvalidName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return stats code 400 when request contains invalid email', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoemail.com'
      }
    }

    const users: UserData[] = []
    const usersRepository = new InMemoryUserRepository(users)
    const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
    const controller: RegisterUserController = new RegisterUserController(registerUserOnMailingList)
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('should return stats code 400 when request is missing user name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        email: 'johndoe@mail.com'
      }
    }

    const users: UserData[] = []
    const usersRepository = new InMemoryUserRepository(users)
    const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
    const controller: RegisterUserController = new RegisterUserController(registerUserOnMailingList)
    const response: HttpResponse = await controller.handle(requestWithInvalidName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return stats code 400 when request is missing user email', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'Any name'
      }
    }

    const users: UserData[] = []
    const usersRepository = new InMemoryUserRepository(users)
    const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
    const controller: RegisterUserController = new RegisterUserController(registerUserOnMailingList)
    const response: HttpResponse = await controller.handle(requestWithInvalidName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })
})
