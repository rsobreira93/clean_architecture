import { Either, left } from '../shared'
import { InvalidEmailError } from './errors/invalid-email-errors'
import { UserData } from './user-data'
import { Email } from './email'

export class User {
  static create (userData: UserData): Either<InvalidEmailError, User > {
    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}