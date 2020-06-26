// AppActions are the actionTypes
import { AppActions } from "./types/actionTypes";
import { Song } from "./types/types";

export const searchSongs = (songs: Song[]): AppActions => ({
  type: "GET_SONGS",
  songs,
});

export const addFavourite = (song: Song): AppActions => ({
  type: "ADD_FAVOURITE",
  song,
});
export const removeFavourite = (song: Song): AppActions => ({
  type: "REMOVE_FAVOURITE",
  song,
});
export const loading = (loading: boolean): AppActions => ({
  type: "LOADING",
  loading,
});
export const searchSongsFunc = (artist: string): AppActions => ({
  type: "SEARCH_SONGS",
  artist,
});
