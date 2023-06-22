import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { Either, right } from '@/shared'
import { UseCase } from '@/use-cases/interfaces'
import { RegisterAndSendEmail } from '@/use-cases/register-and-send-email/register-and-send-email'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@/use-cases/register-user-on-mailing-list/repositories/in-memory/in-memory-users-repository'
import { SendEmail } from '@/use-cases/send-email'
import { EmailOptions, EmailService } from '@/use-cases/send-email/dtos'
import { MailServiceError } from '@/use-cases/send-email/errors/mail-service-error'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/web-controllers/interfaces'

import { RegisterAndSendEmailController } from '@/web-controllers/register-use-controller'

const attachmentFilePath = '../resources/text.txt'
const fromName = 'Test'
const fromEmail = 'test@example.com'
const toName = 'any_name'
const toEmail = 'any_email@example.com'
const subject = 'Test email'
const emailBody = 'Hello world attachment test'
const emailBodyHtml = '<b>Hello world attachment test</b>'
const attachment = [{
  filename: attachmentFilePath,
  contentType: 'text/plain'
}]

const mailOptions: EmailOptions = {
  host: 'test',
  port: 867,
  username: 'test',
  password: 'test',
  from: fromName + ' ' + fromEmail,
  to: toName + '<' + toEmail + '>',
  subject,
  text: emailBody,
  html: emailBodyHtml,
  attachments: attachment
}

class MailServiceMock implements EmailService {
  public timesSendWasCalled = 0
  async send (options: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
    this.timesSendWasCalled++
    return right(options)
  }
}

describe('Register user web controller', () => {
  const users: UserData[] = []
  const usersRepository = new InMemoryUserRepository(users)
  const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
  const mailServiceMock = new MailServiceMock()
  const sendEmailUseCase = new SendEmail(mailOptions, mailServiceMock)
  const registerAndSendEmail = new RegisterAndSendEmail(registerUserOnMailingList, sendEmailUseCase)
  const controller: RegisterAndSendEmailController = new RegisterAndSendEmailController(registerAndSendEmail)

  class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
      throw Error()
    }
  }

  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('should return stats code ok when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@mail.com'
      }
    }

    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(200)
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
    const controller: RegisterAndSendEmailController = new RegisterAndSendEmailController(registerUserOnMailingList)
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

    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('should return stats code 400 when request is missing user name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        email: 'johndoe@mail.com'
      }
    }

    const response: HttpResponse = await controller.handle(requestWithMissingName)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return stats code 400 when request is missing user email', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {
        name: 'Any name'
      }
    }

    const response: HttpResponse = await controller.handle(requestWithMissingEmail)

    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })

  test('should return stats code 500 when server rises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'John Doe',
        email: 'johndoe@mail.com'
      }
    }

    const controller: RegisterAndSendEmailController = new RegisterAndSendEmailController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(request)

    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
