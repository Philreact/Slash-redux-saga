import React, { MouseEvent } from "react";
import classes from "./IndividualCard.module.scss";
import Icon from "@mdi/react";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";

interface Props {
  album: string;
  song: string;
  imgAlbum: string;
  id: number;
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
  favourited: boolean;
}

const IndividualCard = (props: Props) => {
  const handleClick = (event: MouseEvent) => {
    if (!props.favourited) {
      event.preventDefault();
      props.addFavourite({
        trackName: props.song,
        collectionName: props.album,
        artworkUrl100: props.imgAlbum,
        trackId: props.id,
      });
    } else {
      props.removeFavourite({
        trackName: props.song,
        collectionName: props.album,
        artworkUrl100: props.imgAlbum,
        trackId: props.id,
      });
    }
  };

  // let favouriteClassList: string = classes["IndividualCard__icon"];

  // if (props.favourited) {
  //   favouriteClassList = classes["IndividualCard__icon--favourite"];
  // }

  return (
    <div className={classes.IndividualCard}>
      <img
        className={classes["IndividualCard__img"]}
        src={props.imgAlbum}
        alt=""
      />
      <p className={classes["IndividualCard__title"]}>{props.song}</p>
      <p className={classes["IndividualCard__album"]}>{props.album}</p>
      <div
        onClick={handleClick}
        className={classes["IndividualCard__favourite"]}
      >
        {props.favourited ? (
          <Icon
            path={mdiHeart}
            title="favourites"
            className={classes["IndividualCard__icon"]}
          />
        ) : (
          <Icon
            path={mdiHeartOutline}
            title="favourites"
            className={classes["IndividualCard__icon"]}
          />
        )}
      </div>
    </div>
  );
};

export default IndividualCard;
