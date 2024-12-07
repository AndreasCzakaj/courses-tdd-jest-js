import { ValidationError } from "./validation.js"

export class UserSelfService {}

export class Credentials {
  username
  password
}

export class UserSelfServiceError extends Error {}

export class UserError extends UserSelfServiceError {}

export class ServerError extends UserSelfServiceError {}

export class User {
  username
  password
  status
  firstName
  lastName
  emails = []
}

export class UserSession {}
