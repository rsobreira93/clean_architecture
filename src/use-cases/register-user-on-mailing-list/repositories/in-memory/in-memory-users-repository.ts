import { UserData } from '../../dtos/user-data'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private repository: UserData[]

  constructor (repository: UserData[]) {
    this.repository = repository
  }

  async create (user: UserData): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findUserByEmail (email: string): Promise<UserData> {
    return null
  }

  async findAllUsers (): Promise<UserData[]> {
    throw new Error('Method not implemented.')
  }

  async exists (user: UserData): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
