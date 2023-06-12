import { RegisterUserController } from '@/web-controllers/'
import { Request, Response } from 'express'
import { HttpRequest } from '@/web-controllers/interfaces'

export const adaptRout = (controller: RegisterUserController) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httpResponse = await controller.handle(httpRequest)
    response.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
