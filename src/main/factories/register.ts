import { RegisterUserController } from '@/web-controllers'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@/use-cases/register-user-on-mailing-list/repositories/in-memory/in-memory-users-repository'

export const makeRegisterUserController = (): RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([])
  const registerUserOnMailingList = new RegisterUserOnMailingList(
    inMemoryUserRepository
  )
  const registerUserController = new RegisterUserController(registerUserOnMailingList)

  return registerUserController
}
