import { MongoClient, Collection } from 'mongodb'

export const mongoHelper = {
  client: null as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  async clearCollection (name: string): Promise<void> {
    return this.getCollection(name).deleteMany({})
  }

}
