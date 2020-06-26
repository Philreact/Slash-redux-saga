import { Song } from "../actions/types/types";
import { SearchActionTypes } from "../actions/types/actionTypes";

const initialState: Song[] = [];
export default function (
  state = initialState,
  action: SearchActionTypes
): Song[] {
  switch (action.type) {
    case "GET_SONGS":
      return action.songs;
    default:
      return state;
  }
}
