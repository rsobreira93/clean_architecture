import { UserData } from '@/entities'
import { UsersRepository } from '@/use-cases/register-user-on-mailing-list/repositories/users-repository'
import { mongoHelper } from './helper'

export class MongodbUserRepository implements UsersRepository {
  async create (user: UserData): Promise<void> {
    const userCollection = mongoHelper.getCollection('users')
    const exists = await this.exists(user)

    if (!exists) {
      await userCollection.insertOne(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const userCollection = mongoHelper.getCollection('users')

    return await userCollection.findOne({ email })
  }

  async findAllUsers (): Promise<UserData[]> {
    return await mongoHelper.getCollection('users').find().toArray()
  }

  async exists (user: UserData): Promise<boolean> {
    const result = await this.findUserByEmail(user.email)
    if (result !== null) {
      return true
    }
    return false
  }
}
