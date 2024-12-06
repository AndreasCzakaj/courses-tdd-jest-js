import { getPort } from "../src/cnn"

describe("cnn.test", () => {
  test.each`
    given        | expected | reason
    ${undefined} | ${8080}  | ${"Env param not set"}
    ${"xxx"}     | ${8080}  | ${"Env param not numeric"}
    ${1234}      | ${1234}  | ${"Env param used"}
  `("Parameterized: $reason", ({ given, expected }) => {
    const actual = getPort(() => given)
    expect(actual).toEqual(expected)
  })
})
