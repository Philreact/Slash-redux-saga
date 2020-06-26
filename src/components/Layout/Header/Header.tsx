import React, { useEffect, useState, useRef } from "react";
import classes from "./Header.module.scss";
import Icon from "@mdi/react";
import { mdiHeart, mdiGestureTap, mdiMagnify } from "@mdi/js";
import { connect } from "react-redux";
import { searchSongsFunc } from "../../../store/actions/actions";
import { Song } from "../../../store/actions/types/types";
import { AppState } from "../../../store";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../../../store/actions/types/actionTypes";
import { bindActionCreators } from "redux";

interface HeaderPageProps {
  id?: string;
  color?: string;
}
interface HeaderPageState {}

type Props = HeaderPageProps & LinkStateProps & LinkDispatchProps;

const Header = (props: Props) => {
  const [searchKeyword, setSearchKeyword] = useState("Rush");
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
    <div className={classes["Header"]}>
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

        <form className={classes.search}>
          <input
            ref={inputRef}
            type="text"
            className={classes.search__input}
            placeholder="Search"
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            value={searchKeyword}
          />
          <div className={classes.search__button}>
            <Icon
              path={mdiMagnify}
              title="Search"
              className={classes.search__icon}
            />
          </div>
        </form>
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
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: HeaderPageProps
): LinkDispatchProps => ({
  getSongs: bindActionCreators(searchSongsFunc, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
