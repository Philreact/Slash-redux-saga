import React from "react";
import classes from "./Home.module.scss";
import Header from "../../components/Layout/Header/Header";
import CardList from "../../components/Home/CardList/CardList";

const Home = () => {
  return (
    <div className={classes["Home"]}>
      <Header />
      <CardList />
    </div>
  );
};

export default Home;
