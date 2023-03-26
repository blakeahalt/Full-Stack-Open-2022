module.exports = {
    testEnvironment: "node",
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    }
  };
  