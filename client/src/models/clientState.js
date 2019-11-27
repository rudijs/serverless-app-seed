import { types } from "mobx-state-tree";

const State = types
  .model("State", { group: types.string })
  .actions(self => ({
    setGroup(name) {
      self.group = name;
    }
  }))
  .views(self => ({
    get isAuthenticated() {
      return self.group !== "guest";
    }
  }));

export const state = State.create({ group: "guest", cn: 0 });
