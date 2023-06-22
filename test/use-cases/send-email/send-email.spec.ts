import { Either, Left, Right, left, right } from '@/shared'
import { MailServiceError } from '@/use-cases/send-email/errors/mail-service-error'
import { EmailService } from './../../../src/use-cases/send-email/dtos/'
import { EmailOptions } from '@/use-cases/send-email/dtos/email-service'
import { SendEmail } from '@/use-cases/send-email'

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

class MailServiceStub implements EmailService {
  async send (options: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
    return right(options)
  }
}
class MailServiceErrorStub implements EmailService {
  async send (options: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
    return left(new MailServiceError())
  }
}

describe('Send email to user', () => {
  test('should send email to user with valid name and email address', async () => {
    const mailServiceStub = new MailServiceStub()
    const useCase = new SendEmail(mailOptions, mailServiceStub)
    const response = await useCase.perform({ name: toName, email: toEmail })

    expect(response).toBeInstanceOf(Right)
  })

  test('should not be able to send email with invalid email address', async () => {
    const mailServiceStub = new MailServiceStub()
    const useCase = new SendEmail(mailOptions, mailServiceStub)
    const invalidEmail = 'invalid_email'
    const response = await useCase.perform({ name: toName, email: invalidEmail })

    expect(response).toBeInstanceOf(Left)
  })

  test('should return error when service email fails', async () => {
    const mailServiceErrorStub = new MailServiceErrorStub()
    const useCase = new SendEmail(mailOptions, mailServiceErrorStub)
    const response = await useCase.perform({ name: toName, email: toEmail })

    expect(response.value).toBeInstanceOf(MailServiceError)
  })
})
