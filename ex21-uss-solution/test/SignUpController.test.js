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
      body: { ...createValidCredentialsNewUser() },
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

  test("201", async () => {
    // given
    const req = {
      body: { ...createValidCredentialsNewUser() },
    }
    const resp = createResponseFake()

    // when
    await ctrl.action(req, resp)

    // then
    expect(resp.collector).toMatchObject({
      contentType: CONTENT_TYPE_JSON,
      content: {
        ...createValidCredentialsNewUser(),
        status: "new",
      },
      status: 201,
      sent: true,
    })
  })
})
