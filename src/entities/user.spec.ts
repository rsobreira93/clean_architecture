import { left } from '../shared'
import { InvalidEmailError } from './errors/invalid-email-errors'
import { User } from './user'

describe('User domain entity', () => {
  test('should not be able to create a user with a invalid e-mail address', () => {
    const invalidEmail = 'invalidEmail'
    const err = User.create({ name: 'any_name', email: invalidEmail })

    expect(err).toEqual(left(new InvalidEmailError()))
  })
})
