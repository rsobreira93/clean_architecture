import { NodemailerEmailService } from '@/external/mail-services/nodemailer-email-service'
import { EmailOptions } from '@/use-cases/send-email/dtos'
import { MailServiceError } from '@/use-cases/send-email/errors/mail-service-error'

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

jest.mock('nodemailer')
const nodemailer = require('nodemailer')
const sendMailMock = jest.fn().mockReturnValueOnce('ok')
nodemailer.createTransport.mockReturnValueOnce({
  sendMail: sendMailMock
})

describe('Nodemailer mail service adapter', () => {
  beforeEach(() => {
    sendMailMock.mockClear()
    nodemailer.createTransport.mockClear()
  })
  test('should return ok if email sent', async () => {
    const nodemailer = new NodemailerEmailService()
    const result = await nodemailer.send(mailOptions)

    expect(result.value).toEqual(mailOptions)
  })

  test('should return error if email is not sent', async () => {
    const nodemailer = new NodemailerEmailService()

    sendMailMock.mockImplementationOnce(() => {
      throw new Error()
    })

    const result = await nodemailer.send(mailOptions)

    expect(result.value).toBeInstanceOf(MailServiceError)
  })
})
