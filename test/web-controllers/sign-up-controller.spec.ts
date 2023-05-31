import { UserData } from '@/entities'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@/use-cases/register-user-on-mailing-list/repositories/in-memory/in-memory-users-repository'
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
})
