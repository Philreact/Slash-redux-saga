import { takeEvery, all } from "redux-saga/effects";

import { searchSongsFuncSaga } from "./actions";
import { SEARCH_SONGS } from "../actions/types/actionTypes";

export function* watchSearch(): any {
  yield all([takeEvery(SEARCH_SONGS, searchSongsFuncSaga)]);
}
