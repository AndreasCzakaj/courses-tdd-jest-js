export class UserDao {
  async get(identifier) {
    throw new Error("Impl me")
  }

  async save(identifier, object) {
    throw new Error("Impl me")
  }
}

export class DaoError extends Error {
  constructor(message, cause) {
    super(message, { cause })
  }
}

export class UserDaoDictionaryImpl extends UserDao {
  constructor(repo = {}) {
    super()
    this.repo = repo
  }

  async get(identifier) {
    return this.repo[identifier] || null
  }

  async save(identifier, object) {
    this.repo[identifier] = object
    return object
  }
}

export class UserDaoThrowingImpl extends UserDao {
  constructor(repo = {}) {
    super()
    this.repo = repo
  }

  async get(identifier) {
    throw new DaoError("get: oops")
  }

  async save(identifier, object) {
    throw new DaoError("save: oops")
  }
}
