import { Either, left, right } from '@/shared'
import { EmailOptions, EmailService } from '@/use-cases/send-email/dtos'
import { MailServiceError } from '@/use-cases/send-email/errors/mail-service-error'
import * as nodemailer from 'nodemailer'

export class NodemailerEmailService implements EmailService {
  async send (options: EmailOptions): Promise<Either<MailServiceError, EmailOptions>> {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'clara.brown80@ethereal.email',
          pass: 'vdqaBkfa5q4p4qfbs8'
        }
      })

      await transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments
      })
    } catch (err) {
      console.log(err)
      return left(new MailServiceError())
    }
    return right(options)
  }
}
