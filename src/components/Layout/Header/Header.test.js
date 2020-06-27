import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../test/testUtils";
import { storeFactory } from "../../../../test/testUtils";

import Header from "./Header";

const setup = (state = {}) => {
  const store = storeFactory(state);
  return shallow(<Header store={store} />)
    .dive()
    .dive();
};

test("Header renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-header");
  expect(component.length).toBe(1);
});
