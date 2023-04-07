import { left } from '../shared'
import { InvalidEmailError } from './errors/invalid-email-errors'
import { InvalidNameError } from './errors/invalid-name-errors'
import { User } from './user'

describe('User domain entity', () => {
  test('should not be able to create a user with a invalid e-mail address', () => {
    const invalidEmail = 'invalidEmail'
    const err = User.create({ name: 'any_name', email: invalidEmail })

    expect(err).toEqual(left(new InvalidEmailError()))
  })

  test('should not be able to create a user with less than two characters', async () => {
    const invalidName = 'O    '
    const error = User.create({ name: invalidName, email: 'email@mail.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should not be able to create a user with great than 255 characters', async () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({ name: invalidName, email: 'email@mail.com' })

    expect(error).toEqual(left(new InvalidNameError()))
  })

  test('should be able to create a new user', () => {
    const name = 'any_name'
    const email = 'james@gmail.com'
    const user: User = User.create({ name, email }).value as User

    expect(user.name.value).toEqual(name)
    expect(user.email.value).toEqual(email)
  })
})
