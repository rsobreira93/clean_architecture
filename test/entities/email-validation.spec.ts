import { Email } from '../../src/entities/email'

describe('Email validation', () => {
  test('should not be able accept null strings', async () => {
    const email = null
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not be able accept empty strings', async () => {
    const email:string = ''
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should be accept valid email', async () => {
    const email:string = 'email@example.com'
    expect(Email.validate(email)).toBeTruthy()
  })

  test('should not be able accept string larger great than 320 chars', async () => {
    const email:string = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not be able accept domain part larger great than 255 chars', async () => {
    const email:string = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127)
    expect(Email.validate(email)).toBeFalsy()
  })

  test('should not be able accept local part larger great than 64 chars', async () => {
    const email:string = 'l'.repeat(65) + '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
  test('should not be able accept local part empty', async () => {
    const email:string = '@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
  test('should not be able accept domain part empty', async () => {
    const email:string = 'any@'
    expect(Email.validate(email)).toBeFalsy()
  })
  test('should not be able accept domain with a parte larger than 63 chars', async () => {
    const email:string = 'any@' + 'd'.repeat(64) + '.com'
    expect(Email.validate(email)).toBeFalsy()
  })
  test('should not be able accept local parte with invalid char', async () => {
    const email:string = 'any email@mail.com'
    expect(Email.validate(email)).toBeFalsy()
  })
})
