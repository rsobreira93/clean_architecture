import { mongoHelper } from '@/external/repositories/mongodb/helper'
import { MongodbUserRepository } from '@/external/repositories/mongodb/'

describe('Mongodb User Repository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    mongoHelper.clearCollection('Users')
  })

  test('when user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const user = {
      name: 'Test User',
      email: 'kenaa@example.com'
    }

    await userRepository.create(user)

    expect(await userRepository.exists(user)).toBeTruthy()
  })

  test('find all users should return all added users', async () => {
    const userRepository = new MongodbUserRepository()

    await userRepository.create({
      name: 'Test User',
      email: 'kenaa@example.com'
    })

    await userRepository.create({
      name: 'Test User 2',
      email: 'kenaa2@example.com'
    })

    const users = await userRepository.findAllUsers()

    expect(users[0].name).toEqual('Test User')
    expect(users[1].name).toEqual('Test User 2')
  })
})
