import request from 'supertest'
import app from '@/main/config/app'
import { mongoHelper } from '@/external/repositories/mongodb/helper'

describe('Register routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    await mongoHelper.clearCollection('Users')
  })

  test('should return an account on success', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .post('/api/register')
      .send({
        name: 'Any name',
        email: 'any@mail.com'
      })
      .expect(200)
  }, 20000)
})
