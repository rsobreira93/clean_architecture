import { Either, left, right } from '../shared'
import { InvalidEmailError } from './errors/invalid-email-errors'
import { UserData } from './user-data'
import { Email } from './email'
import { InvalidNameError } from './errors/invalid-name-errors'
import { Name } from './name'

export class User {
  public readonly email: Email
  public readonly name: Name

  private constructor (email: Email, name: Name) {
    this.email = email
    this.name = name
  }

  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User > {
    const nameOrError = Name.create(userData.name)

    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }

    const emailOrError = Email.create(userData.email)

    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }

    const email: Email = emailOrError.value as Email
    const name: Name = nameOrError.value as Name

    return right(new User(email, name))
  }
}
