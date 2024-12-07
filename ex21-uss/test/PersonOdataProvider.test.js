import { PersonOdataProvider } from "../src/PersonOdataProvider"

describe("this is only needed because we want to use interfaces and JS does not support interfaces", () => {
  test("get abstract", async () => {
    const provider = new PersonOdataProvider()
    // then
    await expect(() => provider.get()).rejects.toThrowWithMessage(
      Error,
      "Impl me"
    )
  })
})
