export default {
  testEnvironment: "node",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.js",
    "!<rootDir>/node_modules/",
    "!<rootDir>/test",
  ],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  coverageReporters: ["text"],
  reporters: ["default"],
  watchPathIgnorePatterns: [
    "<rootDir>/build/",
    "<rootDir>/coverage/",
    "<rootDir>/dist/",
    "<rootDir>/node_modules/",
  ],
  testRegex: [".*\\.test\\.js$"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
}
