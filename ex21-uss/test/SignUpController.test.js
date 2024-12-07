import { SignUpController, CONTENT_TYPE_JSON } from "../src/SignUpController"
import { UserDaoThrowingImpl } from "../src/UserDao"
import {
  createResponseFake,
  createUserSelfServiceWithWorkingDeps,
  createValidCredentialsNewUser,
} from "./test-utils"

describe("SignUpController.test", () => {
  let service
  let ctrl

  beforeEach(() => {
    service = createUserSelfServiceWithWorkingDeps()
    ctrl = new SignUpController(service)
  })

  test.todo("400")

  test.todo("500")

  test.todo("201")
})
