import { UserData } from '../../dtos/user-data'
import { InMemoryUsersRepository } from './in-memory-users-repository'

describe('In memory User repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const userRepo = new InMemoryUsersRepository(users)
    const user = await userRepo.findUserByEmail('any@mail.com')

    expect(user).toBeNull()
  })
})
