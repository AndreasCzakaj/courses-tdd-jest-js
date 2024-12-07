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
