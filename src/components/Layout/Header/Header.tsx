import React, { useEffect, useRef } from "react";
import classes from "./Header.module.scss";
import Icon from "@mdi/react";
import { mdiHeart, mdiGestureTap } from "@mdi/js";
import { connect } from "react-redux";
import { searchSongsFunc } from "../../../store/actions/actions";
import { Song } from "../../../store/actions/types/types";
import { AppState } from "../../../store";

import { bindActionCreators, Dispatch } from "redux";
import IonSearchbar from "./IonSearchbar";

interface HeaderPageProps {
  id?: string;
  color?: string;
}
interface HeaderPageState {}

type Props = HeaderPageProps & LinkStateProps & LinkDispatchProps;

const Header = (props: Props) => {
  const [searchKeyword, setSearchKeyword] = React.useState("Rush");
  const inputRef = useRef<HTMLInputElement>(null);

  const { getSongs } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        searchKeyword &&
        inputRef.current &&
        searchKeyword === inputRef.current.value
      ) {
        getSongs(searchKeyword);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchKeyword, inputRef, getSongs]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchKeyword(e.target.value);
  };

  const onFocusHandler = () => {};
  return (
    <div data-test="component-header" className={classes["Header"]}>
      <div className={classes["Header__container"]}>
        <div className={classes["nav-left"]}>
          <div className={classes["nav-left__icon-box"]}>
            <Icon
              path={mdiGestureTap}
              title="Logo"
              horizontal
              vertical
              className={classes["nav-left__icon"]}
            />
          </div>
        </div>
        <IonSearchbar
          inputRef={inputRef}
          onChangeHandler={onChangeHandler}
          onFocusHandler={onFocusHandler}
          searchKeyword={searchKeyword}
        />

        <div className={classes["nav-right"]}>
          <div className={classes["nav-right__icon-box"]}>
            <Icon
              path={mdiHeart}
              title="favourites"
              className={classes["nav-right__icon"]}
            />

            <span className={classes["nav-right__notification"]}>
              {props.favourites.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LinkStateProps {
  songs: Song[];
  favourites: Song[];
}
interface LinkDispatchProps {
  getSongs: (artist: string) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: HeaderPageProps
): LinkStateProps => {
  return {
    songs: state.songs,
    favourites: state.favourites,
  };
};
const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: HeaderPageProps
): LinkDispatchProps => ({
  getSongs: bindActionCreators(searchSongsFunc, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
