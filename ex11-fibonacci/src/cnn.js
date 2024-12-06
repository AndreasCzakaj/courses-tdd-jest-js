function getPort() {
  const portAsString = process.env("port")
  if (portAsString == null) {
    return 8080
  }
  try {
    return +portAsString
  } catch (e) {
    return 8080
  }
}
