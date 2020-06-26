import React from "react";
import { connect } from "react-redux";
import classes from "./CardList.module.scss";
import IndividualCard from "./IndividualCard/IndividualCard";
import { Song } from "../../../store/actions/types/types";
import { AppState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../../store/actions/types/actionTypes";
import { bindActionCreators } from "redux";
import { addFavourite, removeFavourite } from "../../../store/actions/actions";
import Spinner from "../../Spinner/Spinner";

interface HeaderPageProps {
  id?: string;
  color?: string;
}
interface HeaderPageState {}

type Props = HeaderPageProps & LinkStateProps & LinkDispatchProps;

const CardList = (props: Props) => {
  return props.loading ? (
    <Spinner show={true} />
  ) : (
    <div className={classes.CardList}>
      {props.songs?.map(
        (
          song: {
            trackName: string;
            collectionName: string;
            artworkUrl100: string;
            trackId: number;
          },
          index
        ) => {
          const find = props.favourites.find(
            (favourite) => favourite.trackId === song.trackId
          );
          return (
            <IndividualCard
              key={song.trackId}
              song={song.trackName}
              album={song.collectionName}
              imgAlbum={song.artworkUrl100}
              id={song.trackId}
              addFavourite={props.addFavourite}
              removeFavourite={props.removeFavourite}
              favourited={find ? true : false}
            />
          );
        }
      )}
    </div>
  );
};

interface LinkStateProps {
  songs?: Song[];
  favourites: Song[];
  loading: boolean;
}

interface LinkDispatchProps {
  addFavourite: (song: {
    trackName: string;
    collectionName: string;
    artworkUrl100: string;
    trackId: number;
  }) => void;
  removeFavourite: (song: {
    trackName: string;
    collectionName: string;
    artworkUrl100: string;
    trackId: number;
  }) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: HeaderPageProps
): LinkStateProps => {
  return {
    songs: state.songs,
    favourites: state.favourites,
    loading: state.loading,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: HeaderPageProps
): LinkDispatchProps => ({
  addFavourite: bindActionCreators(addFavourite, dispatch),
  removeFavourite: bindActionCreators(removeFavourite, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);
