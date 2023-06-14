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
})
