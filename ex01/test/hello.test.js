//const hello = "friends"
import { hello, getValue, getList, getObject } from "../src/hello.js"

describe("covered test", () => {
  test("hello", () => {
    expect(hello).toEqual("friends")
    expect(hello).toBe("friends")
  })

  it.skip("should yield the answer", () => {
    // given
    input = "What's the meaning of it all?"

    // when
    actual = getValue(input)

    // then
    expected = 42
    expect(actual).toEqual(expected)
    expect(actual).toBe(expected)
  })

  it.skip("should match the list items", () => {
    // when
    actual = getList()

    // then
    expected = ["a", "b", "c"]
    expect(actual).toEqual(expected)
    expect(actual).toBe(expected)
  })

  it.todo("should yield the test user")
})
