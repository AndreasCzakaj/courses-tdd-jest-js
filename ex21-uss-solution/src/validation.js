export class ValidationError extends Error {
  constructor(fields) {
    super(JSON.stringify(fields))
  }
}
