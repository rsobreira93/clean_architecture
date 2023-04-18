import { InvalidEmailError } from '../../entities/errors/invalid-email-errors'
import { InvalidNameError } from '../../entities/errors/invalid-name-errors'
import { User } from '../../entities/user'
import { UserData } from '../../entities/user-data'
import { Either, left, right } from '../../shared'
import { UsersRepository } from './repositories/users-repository'

export class RegisterUserOnMailingList {
  private readonly userRepository: UsersRepository
  constructor (userRepository: UsersRepository) {
    this.userRepository = userRepository
  }

  async execute (request: UserData): Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (!(await this.userRepository.exists(request))) {
      await this.userRepository.create(request)
    }

    return right(request)
  }
}
