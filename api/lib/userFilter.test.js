const userFilter = require("./userFilter").userFilter
const fixtureUsers = require("./fixtures/users").users
const expect = require("chai").expect

describe("#userFilter", () => {
  it("should filter Admin and User users", () => {
    const filteredUsers = userFilter(fixtureUsers)
    // console.log(filteredUsers)
    expect(filteredUsers).to.have.property("admin@example.com")
    expect(filteredUsers).to.have.property("user@example.com")
  })
})
