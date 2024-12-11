import { PersonOdataProvider, ProviderError } from "./PersonOdataProvider.js"
import fetch from "node-fetch"

export class PersonOdataProviderNodeFetchImpl extends PersonOdataProvider {
  constructor(opts) {
    super()
    this.opts = opts
  }

  async get(identifier) {
    let resp
    try {
      const url = this.calcUrl(identifier)
      resp = await fetch(url)
    } catch (nodeFetchError) {
      //console.error("nodeFetchError", nodeFetchError)
      throw new ProviderError("IO Error", nodeFetchError)
    }

    const status = resp.status
    const statusText = resp.statusText
    if (status === 200) {
      return resp.json()
    }
    if (status === 404) {
      return undefined
    }
    throw new ProviderError(`HTTP Error: ${status} - ${statusText}`)
  }

  calcUrl(identifier) {
    return `${this.opts.baseUrl}/People/${identifier}`
  }
}
