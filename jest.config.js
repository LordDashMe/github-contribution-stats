module.exports = {
  "roots": [
    "<rootDir>/tests/src/",
  ],
  "cacheDirectory": "jest-cache/",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "!api/*",
    "src/*",
    "!**/node_modules/**",
  ],
  "coverageDirectory": "jest-coverage",
  "testEnvironment": "jsdom"
};
