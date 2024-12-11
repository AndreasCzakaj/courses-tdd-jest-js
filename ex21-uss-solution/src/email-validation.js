import { ValidationError } from "./validation.js"

const REGEX_EMAIL = /^[a-zA-Z0-9\.\-]+@[a-zA-Z0-9\.\-]{2,}\.[a-zA-Z]{2,}$/

export function validateEmail(email) {
  if (email && REGEX_EMAIL.test(email)) {
    return
  }
  throw new ValidationError(["email"])
}
