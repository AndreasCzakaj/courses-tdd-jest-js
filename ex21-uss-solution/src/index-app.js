import express from "express"
import cors from "cors"

export async function runServer(config) {
  console.log("init server...", config)

  // define routes
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get("/", (req, resp) => {
    resp.status(200).send({
      name: "BA demo app",
      endpoints: [{ login: "/uss/session", signUp: "/uss/signUp" }],
    })
  })

  app.post("/uss/session", (req, resp) => {
    config.loginController.action(req, resp)
  })

  app.post("/uss/signUp", (req, resp) => {
    config.signUpController.action(req, resp)
  })

  // start
  const server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`)
  })

  return server
}
