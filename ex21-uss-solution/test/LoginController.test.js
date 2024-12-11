import { LoginController, CONTENT_TYPE_JSON } from "../src/LoginController"
import { UserDaoThrowingImpl } from "../src/UserDao"
import {
  createResponseFake,
  createUserSelfServiceWithWorkingDeps,
  createValidCredentialsExistingUser,
} from "./test-utils"

describe("LoginController.test", () => {
  let service
  let ctrl

  beforeEach(() => {
    service = createUserSelfServiceWithWorkingDeps()
    ctrl = new LoginController(service)
  })

  test("400", async () => {
    // given
    const req = {}
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then
    expect(resp.collector).toEqual({
      status: 400,
      sent: true,
    })
  })

  test("500", async () => {
    // given
    service.userDao = new UserDaoThrowingImpl()
    const req = {
      body: { ...createValidCredentialsExistingUser() },
    }
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then
    expect(resp.collector).toEqual({
      status: 500,
      sent: true,
    })
  })

  test("200", async () => {
    // given
    const req = {
      body: { ...createValidCredentialsExistingUser() },
    }
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then
    expect(resp.collector).toMatchObject({
      contentType: CONTENT_TYPE_JSON,
      content: {},
      status: 200,
      sent: true,
    })
  })
})
