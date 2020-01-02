import * as RBAC from "easy-rbac"

const opts = {
  user: {
    // Role name
    can: [
      // list of allowed operations
      "account",
      "post:add",
      {
        name: "post:save",
        when: async params => params.userId === params.ownerId
      },
      "user:create",
      {
        name: "user:*",
        when: async params => params.id === params.userId
      }
    ]
  },
  manager: {
    can: ["post:save", "post:delete", "account:*"],
    inherits: ["user"]
  },
  admin: {
    can: ["cognito:adminListGroupsForUser"],
    inherits: ["manager"]
  }
}

export const rbac = RBAC.create(opts)
