import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../../test/testUtils";
import { storeFactory } from "../../../../test/testUtils";

import IonSearchbar from "./IonSearchbar";

const setup = (state = {}) => {
  const store = storeFactory(state);
  return shallow(<IonSearchbar store={store} />);
};

test("Input renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-input");
  expect(component.length).toBe(1);
});

test("calls searchSongsFunc when search for an artist", () => {
  const searchSongsFuncMock = jest.fn();

  const props = {
    onChangeHandler: searchSongsFuncMock,
  };
  const wrapper = shallow(<IonSearchbar {...props} />);

  const onChange = findByTestAttr(wrapper, "search-onchange");

  onChange.simulate("change");
  expect(searchSongsFuncMock).toHaveBeenCalled();
});
