import { SearchActionTypes } from "../actions/types/actionTypes";

const initialState: boolean = false;
export default function (
  state = initialState,
  action: SearchActionTypes
): boolean {
  switch (action.type) {
    case "LOADING":
      return !state;

    default:
      return state;
  }
}
