import React from "react";
import classes from "./Spinner.module.scss";

interface Props {
  show: boolean;
}

const Spinner = (props: Props) => {
  return props.show ? (
    <div className={classes["Spinner"]}>
      <div className={classes["loader"]}>Loading...</div>
    </div>
  ) : null;
};

export default Spinner;
