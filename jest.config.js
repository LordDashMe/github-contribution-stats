module.exports = {
  "roots": [
    "<rootDir>/tests/",
  ],
  "cacheDirectory": "jest-cache/",
  "collectCoverage": true,
  "collectCoverageFrom": [
    "!api/*",
    "src/*",
    "!**/node_modules/**",
  ],
  "coverageDirectory": "jest-coverage"
};
