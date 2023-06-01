import { RegisterUserOnMailingList } from '@/use-cases/register-user-on-mailing-list/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from './interfaces'
import { UserData } from '@/entities'
import { badRequest, created } from './util'
import { MissingParamError } from './errors/missing-param-error'

export class RegisterUserController {
  private readonly useCase: RegisterUserOnMailingList
  constructor (useCase: RegisterUserOnMailingList) {
    this.useCase = useCase
  }

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const userData: UserData = request.body
    const response = await this.useCase.execute(userData)

    if (!request.body.name || !request.body.email) {
      let missingParam = !(request.body.name) ? 'name' : ''
      missingParam += !(request.body.email) ? 'email' : ''

      return badRequest(new MissingParamError(missingParam))
    }

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
