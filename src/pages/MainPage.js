import Movie from "../components/Movie/Movie";
import Navbar from "../components/Navbar/Navbar";
import { useQuery } from "@apollo/client";

import classes from "./pages styles/mainpage.module.scss";

import { MOVIES } from "../queries/index";
import { useState } from "react";

const MainPage = (props) => {
  const { loading, err, data } = useQuery(MOVIES, {});

  //Sorting Movies
  //I dont know if this sorting method is a good way to sort them, its my first time to
  //implement sorting.

  let prevSortPref = localStorage.getItem("sortPref");

  const [sortValue, setSortValue] = useState(prevSortPref);

  const sortHandler = (e) => {
    setSortValue(e.target.value);
    localStorage.setItem("sortPref", e.target.value);
    //console.log(sortValue);
  };

  if (data) {
    return (
      <div>
        <Navbar />
        <div className={classes.sortbutton}>
          <div className={classes.sort1}>
            <h4>Sort by</h4>
          </div>
          <div className={classes.sort2}>
            <select onChange={sortHandler}>
              <option value={prevSortPref} selected disabled hidden>
                {prevSortPref === "bydate"
                  ? "Date"
                  : prevSortPref === "byname"
                  ? "Name"
                  : "Rating"}
              </option>
              <option value="bydate">Date</option>
              <option value="byname">Name</option>
              <option value="byrating">Rating</option>
            </select>
          </div>
        </div>
        <div className={classes.movielist}>
          {sortValue === "byrating" ? (
            <div className={classes.movies}>
              {data.movies
                .slice()
                .sort((a, b) =>
                  a.ratingsAvg < b.ratingsAvg
                    ? 1
                    : b.ratingsAvg < a.ratingsAvg
                    ? -1
                    : 0
                )
                .map((movie) => (
                  <Movie key={movie.id} {...movie} />
                ))}
            </div>
          ) : sortValue === "byname" ? (
            <div className={classes.movies}>
              {data.movies
                .slice()
                .sort((a, b) =>
                  a.title > b.title ? 1 : b.title > a.title ? -1 : 0
                )
                .map((movie) => (
                  <Movie key={movie.id} {...movie} />
                ))}
            </div>
          ) : (
            <div className={classes.movies}>
              {data.movies.map((movie) => (
                <Movie key={movie.id} {...movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default MainPage;
