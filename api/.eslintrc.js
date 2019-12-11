module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: ["eslint:recommended", "eslint-config-prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module"
  },
  rules: {
    strict: ["error", "never"]
  }
}
