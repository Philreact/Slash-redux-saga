import { put } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actions";
import { SearchActionTypes } from "../actions/types/actionTypes";

export function* searchSongsFuncSaga(action: {
  artist: SearchActionTypes;
  type: SearchActionTypes;
}) {
  yield put(actions.loading(true));

  try {
    const res = yield axios.get(
      `https://itunes.apple.com/search?term=${action.artist}&entity=song`
    );

    yield put(actions.loading(false));

    yield put(actions.searchSongs(res.data.results));
  } catch (error) {
    console.log(error);

    yield put(actions.loading(false));
  }
}
