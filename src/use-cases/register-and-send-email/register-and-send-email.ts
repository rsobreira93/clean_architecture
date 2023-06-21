import { User, UserData } from '@/entities'
import { UseCase } from '../interfaces'
import { SendEmail } from '../send-email'
import { RegisterUserOnMailingList } from './../register-user-on-mailing-list/register-user-on-mailing-list'
import { InvalidNameError, InvalidEmailError } from '@/entities/errors'
import { Either, left, right } from '@/shared'
import { MailServiceError } from '../send-email/errors/mail-service-error'
export class RegisterAndSendEmail implements UseCase {
  private registerUserOnMailingList:RegisterUserOnMailingList
  private sendEmail: SendEmail

  constructor (registerUserOnMailingList: RegisterUserOnMailingList, sendEmail: SendEmail) {
    this.registerUserOnMailingList = registerUserOnMailingList
    this.sendEmail = sendEmail
  }

  async perform (request: UserData): Promise<Either<InvalidNameError | InvalidEmailError | MailServiceError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(request)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user: User = userOrError.value
    const userData = { name: user.name.value, email: user.email.value }

    await this.registerUserOnMailingList.perform(userData)

    const result = await this.sendEmail.perform(userData)

    if (result.isLeft()) {
      return left(result.value)
    }

    return right({ name: user.name.value, email: user.email.value })
  }
}
