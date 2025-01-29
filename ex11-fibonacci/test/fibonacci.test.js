import { FibonacciLoopImpl, FibonacciRecursionImpl } from "../src/fibonacci"

export const fibonacciTest = (name, fibonacci) =>
  describe(`fibonacci test using implementation ${name}"`, () => {
    it.each`
      index        | expected
      ${undefined} | ${"index must be a number >= 0"}
      ${null}      | ${"index must be a number >= 0"}
      ${""}        | ${"index must be a number >= 0"}
      ${"x"}       | ${"index must be a number >= 0"}
      ${-1}        | ${"index must be a number >= 0"}
    `(
      "should fail for index $index with error $expected",
      ({ index, expected }) => {
        const action = () => fibonacci.calc(index)
        expect(action).toThrow(expected)
      }
    )

    it.each`
      index | expected
      ${0}  | ${0}
      ${1}  | ${1}
      ${2}  | ${1}
      ${3}  | ${2}
      ${5}  | ${5}
      ${6}  | ${8}
      ${7}  | ${13}
      ${19} | ${4_181}
      ${30} | ${832_040}
    `("should yield $expected for index $index", ({ index, expected }) => {
      const actual = fibonacci.calc(index)
      expect(actual).toEqual(expected)
    })

    it.skip("should show which impl is slow af", () => {
      expect(fibonacci.calc(46)).toBe(1_836_311_903)
    })
  })

describe("Fibonacci 1st implementation", () => {
  fibonacciTest("1st impl", new FibonacciLoopImpl())
})

describe("Fibonacci 2nd implementation", () => {
  fibonacciTest("2nd impl", new FibonacciRecursionImpl())
})
