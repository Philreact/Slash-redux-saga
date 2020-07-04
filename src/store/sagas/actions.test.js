import moxios from "moxios";

import SagaTester from "redux-saga-tester";

import { searchSongsFuncSaga } from "./actions";

const initialState = [];
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SONGS":
      return action.songs;
    default:
      return state;
  }
};

describe("searchSongsFuncSaga saga", () => {
  let sagaTester = null;
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  test("get songs with the author's name", async () => {
    const songs = [
      {
        trackName: "title",
        collectionName: "album",
        artworkUrl100: "img",
        trackId: 2,
      },
    ];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { results: songs },
      });
    });

    sagaTester = new SagaTester({
      initialState,
      reducers: reducer,
    });
    sagaTester.start(searchSongsFuncSaga, { artist: "madonna" });

    const successAction = await sagaTester.waitFor("GET_SONGS");

    sagaTester.dispatch(successAction);

    expect(sagaTester.getState()).toEqual(songs);
  });
});
