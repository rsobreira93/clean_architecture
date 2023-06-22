
import { EmailOptions } from '@/use-cases/send-email/dtos'

const attachments = [{
  filename: 'clean-architecture.pdf',
  path: 'https://otaviolemos.github.io/clean-architecture.pdf'
}]

export function getEmailOptions (): EmailOptions {
  const from = 'Romulo Sobreira | <clara.brown80@ethereal.email>'
  const to = ''
  const mailOptions: EmailOptions = {
    host: 'smtp.ethereal.email',
    port: 587,
    username: 'clara.brown80@ethereal.email',
    password: 'vdqaBkfa5q4p4qfbs8',
    from,
    to,
    subject: 'Messagem de teste',
    text: 'Texto da mensagem',
    html: '<b>HTML da mensagem</b>',
    attachments
  }

  return mailOptions
}
