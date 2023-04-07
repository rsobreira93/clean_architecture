import { Either, left } from '../shared'
import { InvalidEmailError } from './errors/invalid-email-errors'
import { UserData } from './user-data'
import { Email } from './email'
import { InvalidNameError } from './errors/invalid-name-errors'
import { Name } from './name'

export class User {
  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User > {
    const nameOrError = Name.create(userData.name)

    if (nameOrError) {
      return left(new InvalidNameError())
    }

    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
