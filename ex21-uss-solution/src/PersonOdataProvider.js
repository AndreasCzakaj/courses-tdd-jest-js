export class PersonOdataProvider {
  async get(identifier) {
    throw new Error("Impl me")
  }
}

export class ProviderError extends Error {
  constructor(message, cause) {
    super(message, { cause })
  }
}

export class PersonOdataProviderDictionaryImpl extends PersonOdataProvider {
  constructor(repo = {}) {
    super()
    this.repo = repo
  }

  async get(identifier) {
    return this.repo[identifier]
  }
}

export class PersonOdataProviderThrowingImpl extends PersonOdataProvider {
  async get(identifier) {
    throw new ProviderError("oops")
  }
}
