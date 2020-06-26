import { Song } from "../actions/types/types";
import { SearchActionTypes } from "../actions/types/actionTypes";

const initialState: any = [];
export default function (
  state = initialState,
  action: SearchActionTypes
): Song[] {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return [...state, action.song];
    case "REMOVE_FAVOURITE":
      const filter = state.filter(
        (favorite: Song) => favorite.trackId !== action.song.trackId
      );

      return [...filter];

    default:
      return state;
  }
}
