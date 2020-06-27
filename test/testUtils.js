import { createStore, applyMiddleware } from "redux";

import { rootReducer, middleware } from "../src/store";

export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

export const storeFactory = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
};
