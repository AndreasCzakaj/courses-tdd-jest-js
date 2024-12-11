import { UserError } from "./user-self-service.js"
import { ValidationError } from "./validation.js"

export const CONTENT_TYPE_JSON = "application/json"

export class LoginController {
  constructor(service) {
    this.service = service
  }

  async action(req, resp) {
    //console.log(`LoginController.action: incoming req...`)
    const input = req.body

    try {
      const result = await this.service.login(input)
      resp.contentType(CONTENT_TYPE_JSON).status(200).send(result)
    } catch (serviceError) {
      resp.status(calcHttpErrorCode(serviceError)).send()
    }
  }
}

export function calcHttpErrorCode(e) {
  if (e instanceof UserError || e instanceof ValidationError) {
    return 400
  }
  return 500
}
