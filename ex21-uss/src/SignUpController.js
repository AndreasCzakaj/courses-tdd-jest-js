export class SignUpController {
  constructor(service) {
    this.service = service
  }

  async action(req, resp) {
    //console.log(`SignUpController.action: incoming req...`)
    const input = req.body

    // impl try/catch and send the appropriate http status
  }
}
