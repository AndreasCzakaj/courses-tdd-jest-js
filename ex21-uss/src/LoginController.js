export class LoginController {
  constructor(service) {
    this.service = service
  }

  async action(req, resp) {
    //console.log(`LoginController.action: incoming req...`)
    const input = req.body

    // impl try/catch and send the appropriate http status
  }
}
