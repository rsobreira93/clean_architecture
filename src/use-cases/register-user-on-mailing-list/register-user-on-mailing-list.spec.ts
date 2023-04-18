import { InvalidEmailError } from '../../entities/errors/invalid-email-errors'
import { InvalidNameError } from '../../entities/errors/invalid-name-errors'
import { UserData } from '../../entities/user-data'
import { left } from '../../shared'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repositories/in-memory/in-memory-users-repository'

describe('Register user on mailing list use case', () => {
  test('should add user withe complete data to mailing list', async () => {
    const users: UserData[] = []
    const usersRepository = new InMemoryUserRepository(users)
    const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
    const name = 'any_name'
    const email = 'any_email@mail.com'
    const response = await registerUserOnMailingList.execute({ name, email })
    const user = await usersRepository.findUserByEmail(email)

    expect(user.name).toBe('any_name')
    expect(response.value.name).toBe('any_name')
  })

  test('should not be able to add user with invalid email to mailing list', async () => {
    const users: UserData[] = []
    const usersRepository = new InMemoryUserRepository(users)
    const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
    const name = 'any_name'
    const invalidEmail = 'invalid_email'
    const response = await registerUserOnMailingList.execute({ name, email: invalidEmail })
    const user = await usersRepository.findUserByEmail(invalidEmail)

    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidEmailError()))
  })

  test('should add user withe complete data to mailing list', async () => {
    const users: UserData[] = []
    const usersRepository = new InMemoryUserRepository(users)
    const registerUserOnMailingList = new RegisterUserOnMailingList(usersRepository)
    const invalidName = ''
    const email = 'any_email@mail.com'
    const response = await registerUserOnMailingList.execute({ name: invalidName, email })
    const user = await usersRepository.findUserByEmail(email)

    expect(user).toBeNull()
    expect(response).toEqual(left(new InvalidNameError()))
  })
})
