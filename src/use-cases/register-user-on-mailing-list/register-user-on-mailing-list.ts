import { User, UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { Either, left, right } from '@/shared'
import { UsersRepository } from './repositories/users-repository'
import { UseCase } from '../interfaces'

export class RegisterUserOnMailingList implements UseCase {
  private readonly userRepository: UsersRepository
  constructor (userRepository: UsersRepository) {
    this.userRepository = userRepository
  }

  async perform (
    request: UserData
  ): Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> =
      User.create(request)

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (!(await this.userRepository.exists(request))) {
      await this.userRepository.create(request)
    }

    return right(request)
  }
}
