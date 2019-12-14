const userFilter = users => {
  // console.log(JSON.stringify(users, null, 2))
  const userList = users.map(user => {
    const userName = user.Username

    const email = user.Attributes.filter(attribute => {
      return attribute.Name === "email"
    })

    return { email: email[0].Value, userName }
  })
  // console.log(userList)
  const usersObj = userList.reduce((prev, curr) => {
    return { ...prev, [curr.email]: curr.userName }
  }, {})
  return usersObj
}

exports.userFilter = userFilter
