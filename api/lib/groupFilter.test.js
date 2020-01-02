import { groupFilter } from "./groupFilter"
import { data } from "./fixtures/adminListGroupsForUser"

describe("#groupFilter", () => {
  it("should return a list of groups", () => {
    const groups = groupFilter(data)
    expect(groups.length).toBe(2)
  })
})
