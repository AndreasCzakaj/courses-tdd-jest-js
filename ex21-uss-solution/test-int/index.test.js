import { server, config, mongodb } from "../src/index"
import fetch from "node-fetch"

describe("index", () => {
  test("index / OK", async () => {
    const url = `http://localhost:${config.port}/`
    const resp = await fetch(url)
    expect(resp.status).toBe(200)
    expect(await resp.json()).toMatchObject({
      name: "BA demo app",
    })
  })

  test("/uss/session", async () => {
    const resp = await fetch(`http://localhost:${config.port}/uss/session`, {
      method: "POST",
    })
    expect(resp.status).toBe(400)
  })

  test("/uss/signUp", async () => {
    const resp = await fetch(`http://localhost:${config.port}/uss/signUp`, {
      method: "POST",
    })
    expect(resp.status).toBe(400)
  })

  afterAll(() => {
    server?.close()
    mongodb.stop()
  })
})
