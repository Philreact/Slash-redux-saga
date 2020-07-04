import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr } from "../../../../test/testUtils";
import { storeFactory } from "../../../../test/testUtils";

import IonSearchbar from "./IonSearchbar";

import Header from "./Header";

const setup = (state = {}, props = {}) => {
  const store = storeFactory(state);
  return shallow(<Header store={store} {...props} />)
    .dive()
    .dive();
};

test("Header renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-header");

  expect(component.length).toBe(1);
});

test("state updates with value of input box upon change", () => {
  let mockSetSearchKeyword = jest.fn();

  React.useState = jest.fn(() => ["hello", mockSetSearchKeyword]);

  const wrapper = setup();
});
