const RBAC = require("easy-rbac")

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
    can: ["rule the server"],
    inherits: ["manager"]
  }
}

const rbac = new RBAC(opts)

;(async function() {
  try {
    const res = await rbac.can("user", "post:add")
    console.log(101, res)

    const res2 = await rbac.can("user", "post:save", { userId: 1, ownerId: 2 })
    console.log(201, res2)

    const res3 = await rbac.can(["user", "manager"], "post:save", { userId: 1, ownerId: 2 })
    console.log(301, res3)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("Error", e)
  }
})()
