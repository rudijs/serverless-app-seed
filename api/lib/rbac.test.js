/* eslint-disable no-console */
import { rbac } from "./rbac"

describe("#rbac", () => {
  it("should allow a user to add a post", async () => {
    const res = await rbac.can("user", "post:add")
    expect(res).toBeTruthy()
  })

  it("should deny a user to save a post not theirs", async () => {
    const res = await rbac.can("user", "post:save", { userId: 1, ownerId: 2 })
    expect(res).toBeFalsy()
  })

  it("should allow a manager to save a post not theirs", async () => {
    const res = await rbac.can(["user", "manager"], "post:save", { userId: 1, ownerId: 2 })
    expect(res).toBeTruthy()
  })

  it("should allow a admin cognito:adminListGroupsForUser", async () => {
    const res = await rbac.can("admin", "cognito:adminListGroupsForUser")
    expect(res).toBeTruthy()
  })

  it("should deny a user cognito:adminListGroupsForUser", async () => {
    const res = await rbac.can(["user"], "cognito:adminListGroupsForUser")
    expect(res).toBeFalsy()
  })
})
