import { DaoError, UserDao } from "./UserDao.js"

export class UserDaoMongoImpl extends UserDao {
  constructor(mongoClient) {
    super()
    this.mongoClient = mongoClient
    const database = mongoClient.db()
    this.collection = database.collection("users")
  }

  async get(identifier) {
    const query = {
      username: identifier,
    }

    try {
      const out = await this.collection.findOne(query)
      return out === null ? undefined : out
    } catch (e) {
      //console.warn("get: Mongo Error", e)
      throw new DaoError("Mongo Error", e)
    }
  }

  async save(identifier, object) {
    try {
      const out = await this.collection.insertOne(object)
      return { ...object, insertedId: out.insertedId }
    } catch (e) {
      //console.warn("get: Mongo Error", e)
      throw new DaoError("Mongo Error", e)
    }
  }
}
