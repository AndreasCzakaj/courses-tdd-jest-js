import { ValidationError } from "./validation.js"

export class UserSelfService {
  constructor(userDao, personOdataProvider) {
    this.userDao = userDao
    this.personOdataProvider = personOdataProvider
  }

  async login(credentials) {
    validateCredentials(credentials)
    const user = await this.getUserFromDao(credentials.username)
    if (user?.password === credentials.password) {
      return new UserSession()
    }
    throw new UserError("Unknown username or wrong password")
  }

  async signUp(signUpData) {
    validateSignUpData(signUpData)

    const existingUser = await this.getUserFromDao(signUpData.username)
    if (existingUser) {
      throw new UserError("username already taken")
    }

    let newUser = new User()
    newUser.username = signUpData.username
    newUser.password = signUpData.password
    newUser.status = "new"

    const personOdata = await this.getRemotePersonData(signUpData.username)
    if (personOdata) {
      newUser.emails = personOdata.Emails
      newUser.firstName = personOdata.FirstName
      newUser.lastName = personOdata.LastName
    } else {
      throw new UserError("user unknown in remote system")
    }

    newUser = await this.userDao.save(signUpData.username, newUser)
    return newUser
  }

  async getUserFromDao(username) {
    try {
      return await this.userDao.get(username)
    } catch (daoError) {
      throw new ServerError("Database not available. Try later.")
    }
  }

  async getRemotePersonData(username) {
    try {
      return await this.personOdataProvider.get(username)
    } catch (providerError) {
      throw new ServerError("Remote Service not available. Try later.")
    }
  }
}

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

const REGEX_PASSWORD = /^[a-zA-Z0-9\.\-_]{8,12}$/
export function validatePassword(password) {
  if (password && REGEX_PASSWORD.test(password)) {
    return
  }
  throw new ValidationError(["password"])
}

const REGEX_USERNAME = /^[a-z0-9]{8,16}$/
export function validateUsername(username) {
  if (username && REGEX_USERNAME.test(username)) {
    return
  }
  throw new ValidationError(["username"])
}

export function validateCredentials(credentials) {
  if (credentials) {
    validateUsername(credentials.username)
    validatePassword(credentials.password)
    return
  }
  throw new ValidationError(["username", "password"])
}

export function validateSignUpData(signUpData) {
  if (signUpData) {
    validateUsername(signUpData.username)
    validatePassword(signUpData.password)
    return
  }
  throw new ValidationError(["username", "password"])
}
