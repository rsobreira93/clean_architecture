import { RegisterAndSendEmailController } from '@/web-controllers'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { MongodbUserRepository } from '@/external/repositories/mongodb'

export const makeRegisterAndSendEmailController = (): RegisterAndSendEmailController => {
  const mongoDbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingList = new RegisterUserOnMailingList(
    mongoDbUserRepository
  )
  const registerAndSendEmailController = new RegisterAndSendEmailController(registerUserOnMailingList)

  return registerAndSendEmailController
}
