import { RegisterAndSendEmailController } from '@/web-controllers/'
import { Request, Response } from 'express'
import { HttpRequest } from '@/web-controllers/interfaces'

export const adaptRoute = (controller: RegisterAndSendEmailController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
