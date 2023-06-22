import { RegisterAndSendEmailController } from '@/web-controllers'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { SendEmail } from '@/use-cases/send-email'
import { NodemailerEmailService } from '@/external/mail-services/nodemailer-email-service'
import { getEmailOptions } from '../config/email'
import { RegisterAndSendEmail } from '@/use-cases/register-and-send-email/register-and-send-email'

export const makeRegisterAndSendEmailController = (): RegisterAndSendEmailController => {
  const mongoDbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingList = new RegisterUserOnMailingList(
    mongoDbUserRepository
  )
  const emailService = new NodemailerEmailService()
  const sendEmailUseCase = new SendEmail(getEmailOptions(), emailService)
  const registerAndSendEmailUseCase = new RegisterAndSendEmail(registerUserOnMailingList, sendEmailUseCase)
  const registerAndSendEmailController = new RegisterAndSendEmailController(registerAndSendEmailUseCase)

  return registerAndSendEmailController
}
