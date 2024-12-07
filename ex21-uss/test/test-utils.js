import { Credentials } from "../src/user-self-service"
import russellwhyte from "./user-russellwhyte.json"

export { russellwhyte }

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
