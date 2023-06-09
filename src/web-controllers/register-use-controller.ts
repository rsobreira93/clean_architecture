import { HttpRequest, HttpResponse } from './interfaces'
import { UserData } from '@/entities'
import { badRequest, ok, serverError } from './util'
import { MissingParamError } from './errors/missing-param-error'
import { UseCase } from '@/use-cases/interfaces'

export class RegisterAndSendEmailController {
  private readonly useCase: UseCase
  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const userData: UserData = request.body
      const response = await this.useCase.perform(userData)

      if (!request.body.name || !request.body.email) {
        let missingParam = !(request.body.name) ? 'name' : ''
        missingParam += !(request.body.email) ? 'email' : ''

        return badRequest(new MissingParamError(missingParam))
      }

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      return ok(response.value)
    } catch (error) {
      return serverError(error)
    }
  }
}
