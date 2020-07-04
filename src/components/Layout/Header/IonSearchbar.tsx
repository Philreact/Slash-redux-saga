import React from "react";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import classes from "./IonSearchbar.module.scss";

interface Props {
  inputRef: React.Ref<HTMLInputElement>;
  onChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
  onFocusHandler: React.FocusEventHandler<HTMLInputElement>;
  searchKeyword: string;
}

const IonSearchbar = (props: Props) => {
  return (
    <form data-test="component-input" className={classes.search}>
      <input
        ref={props.inputRef}
        type="text"
        className={classes.search__input}
        placeholder="Search"
        onChange={props.onChangeHandler}
        onFocus={props.onFocusHandler}
        value={props.searchKeyword}
        data-test="search-onchange"
      />
      <div className={classes.search__button}>
        <Icon
          path={mdiMagnify}
          title="Search"
          className={classes.search__icon}
        />
      </div>
    </form>
  );
};

export default IonSearchbar;
