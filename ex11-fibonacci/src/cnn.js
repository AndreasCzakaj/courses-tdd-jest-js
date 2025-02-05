function getPort(envProvider) {
  const portAsString = envProvider()
  if (portAsString === undefined) {
    return 8080
  }

  const num = +portAsString
  return isNaN(num) ? 8080 : num
}

export { getPort }

function getPort2(envProvider) {
  let out

  const portAsString = envProvider()
  if (portAsString === undefined) {
    out = 8080
  } else {
    out = +portAsString
    if (isNaN) {
      out = 8080
    }
  }

  return out
}
