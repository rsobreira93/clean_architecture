
import { EmailOptions } from '@/use-cases/send-email/dtos'

const attachments = [{
  filename: 'text.txt',
  path: '../../resources/text.txt'
}]
export function getEmailOptions (): EmailOptions {
  const from = 'Romulo Sobreira | <sobreiraromuloes@gmail.com>'
  const to = ''
  const mailOptions: EmailOptions = {
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT),
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    from,
    to,
    subject: 'Messagem de teste',
    text: 'Texto da mensagem',
    html: '<b>HTML da mensagem</b>',
    attachments
  }

  return mailOptions
}
