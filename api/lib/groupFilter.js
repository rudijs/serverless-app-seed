export const groupFilter = data => {
  return data.Groups.map(item => {
    return item.GroupName
  }).sort()
}

// exports.groupFilter = groupFilter
