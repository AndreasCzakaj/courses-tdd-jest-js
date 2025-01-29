export class FibonacciLoopImpl {
  calc(index) {
    validateIndex(index)
    if (index < 2) {
      return index
    }
    let n2 = 0
    let n1 = 1
    let n = 0
    for (let i = 1; i < index; i++) {
      n = n1 + n2
      n2 = n1
      n1 = n
    }
    return n
  }
}

export class FibonacciRecursionImpl {
  calc(index) {
    validateIndex(index)
    if (index < 2) {
      return index
    }
    return this.calc(index - 1) + this.calc(index - 2)
  }
}

function validateIndex(index) {
  if (
    index === undefined ||
    index === null ||
    !Number.isInteger(index) ||
    isNaN(index) ||
    index < 0
  ) {
    throw new Error("index must be a number >= 0")
  }
}
