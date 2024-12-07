import { DaoError, UserDao } from "../src/UserDao"

describe("UserDao: this is only needed because we want to use interfaces and JS does not support interfaces", () => {
  test.each`
    dao              | method   | expected
    ${new UserDao()} | ${"get"} | ${new Error("Impl me")}
  `("Parameterized", async ({ dao, method, expected }) => {
    const func = dao[method]
    await expect(() => func()).rejects.toThrow(expected)
  })
})
