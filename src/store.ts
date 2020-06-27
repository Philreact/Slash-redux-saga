// @ts-nocheck

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
// import thunk, { ThunkMiddleware } from "redux-thunk";
import songs from "./store/reducers/songs";
import favourites from "./store/reducers/favourites";
import loading from "./store/reducers/loading";
import { watchSearch } from "./store/sagas/";

import createSagaMiddleware from "redux-saga";

export const rootReducer = combineReducers({
  songs,
  favourites,
  loading,
});

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

// const middleware = [thunk as ThunkMiddleware<AppState, AppActions>];
export const middleware = [sagaMiddleware];
let composeEnhancers = compose;
if (process.browser) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(watchSearch);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
