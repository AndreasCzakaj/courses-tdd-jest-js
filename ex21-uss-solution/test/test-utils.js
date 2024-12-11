import { PersonOdataProviderDictionaryImpl } from "../src/PersonOdataProvider"
import { Credentials, UserSelfService } from "../src/user-self-service"
import { UserDaoDictionaryImpl } from "../src/UserDao"
import russellwhyte from "./user-russellwhyte.json"

export function createUserSelfServiceWithWorkingDeps() {
  const credentials = createValidCredentialsExistingUser()
  const repo = {}
  repo[credentials.username] = { ...credentials }
  const userDao = new UserDaoDictionaryImpl(repo)

  const newUser = createValidCredentialsNewUser()
  const odataRepo = {}
  odataRepo[newUser.username] = russellwhyte
  const personOdataProvider = new PersonOdataProviderDictionaryImpl(odataRepo)

  return new UserSelfService(userDao, personOdataProvider)
}

export function createResponseFake() {
  return new ResponseFake()
}

class ResponseFake {
  constructor() {
    this.collector = {
      contentType: undefined,
      content: undefined,
      status: undefined,
      sent: false,
    }
  }
  contentType(v) {
    this.collector.contentType = v
    return this
  }
  send(v) {
    this.collector.content = v
    this.collector.sent = true
    return this
  }
  status(v) {
    this.collector.status = v
    return this
  }
}

export const validButWrongPassword = "wrongpasswd"

export function createValidCredentialsExistingUser() {
  const out = new Credentials()
  out.username = "ialreadyexist"
  out.password = "pa55w0rd"
  return out
}

export function createValidCredentialsNewUser() {
  const out = new Credentials()
  out.username = "russellwhyte"
  out.password = "otherpasswd"
  return out
}

export function createValidCredentialsNewUserUnknownInRemoteSystem() {
  const out = new Credentials()
  out.username = "idonotexist"
  out.password = "somepasswd"
  return out
}
