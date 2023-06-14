import { RegisterUserController } from '@/web-controllers'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { MongodbUserRepository } from '@/external/repositories/mongodb'

export const makeRegisterUserController = (): RegisterUserController => {
  const mongoDbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingList = new RegisterUserOnMailingList(
    mongoDbUserRepository
  )
  const registerUserController = new RegisterUserController(registerUserOnMailingList)

  return registerUserController
}
