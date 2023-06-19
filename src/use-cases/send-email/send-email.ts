import { UserData } from '@/entities'
import { UseCase } from '../interfaces'
import { EmailOptions, EmailService } from './dtos'
import { Either } from '@/shared'
import { MailServiceError } from './errors/mail-service-error'

export class SendEmail implements UseCase {
  private readonly emailOptions: EmailOptions
  private readonly emailService: EmailService

  constructor (emailOptions: EmailOptions, emailService: EmailService) {
    this.emailOptions = emailOptions
    this.emailService = emailService
  }

  async perform (userDate: UserData): Promise<Either<MailServiceError, EmailOptions>> {
    const greetings = 'E aí <b>' + userDate.name + '</b>, beleza?'
    const customizedHtml = greetings + '<br> <br>' + this.emailOptions.html
    const emailInfo: EmailOptions = {
      host: this.emailOptions.host,
      port: this.emailOptions.port,
      username: this.emailOptions.username,
      password: this.emailOptions.password,
      from: this.emailOptions.from,
      to: userDate.name + '<' + userDate.email + '>',
      subject: this.emailOptions.subject,
      text: this.emailOptions.text,
      html: customizedHtml,
      attachments: this.emailOptions.attachments
    }

    return this.emailService.send(emailInfo)
  }
}
