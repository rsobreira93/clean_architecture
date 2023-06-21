import { User, UserData } from '@/entities'
import { Either, right } from '@/shared'
import { RegisterAndSendEmail } from '@/use-cases/register-and-send-email/register-and-send-email'
import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '@/use-cases/register-user-on-mailing-list/repositories/in-memory/in-memory-users-repository'
import { SendEmail } from '@/use-cases/send-email'
import { EmailOptions, EmailService } from '@/use-cases/send-email/dtos'
import { MailServiceError } from '@/use-cases/send-email/errors/mail-service-error'

describe('Register and send email to user', () => {
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

  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const usersRepository = new InMemoryUserRepository(users)
    const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
    const mailServiceMock = new MailServiceMock()
    const sendEmailUseCase = new SendEmail(mailOptions, mailServiceMock)
    const registerAndSendEmail = new RegisterAndSendEmail(registerUserOnMailingList, sendEmailUseCase)
    const name = 'any_name'
    const email = 'any_email@mail.com'
    const response: User = (await registerAndSendEmail.perform({ name, email })).value as User
    const user = await usersRepository.findUserByEmail(email)

    expect(user.name).toBe('any_name')
    expect(response.name.value).toBe('any_name')
    expect(mailServiceMock.timesSendWasCalled).toBe(1)
    expect(response.name.value).toEqual('any_name')
  })
})
