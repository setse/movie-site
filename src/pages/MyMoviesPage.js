import Movie from "../components/Movie/Movie";
import Navbar from "../components/Navbar/Navbar";
import { useQuery } from "@apollo/client";

import classes from "./pages styles/mainpage.module.scss";

import { MOVIES, GETUSER } from "../queries/index";

const MyMoviesPage = (props) => {
  const { loading, err, data } = useQuery(MOVIES, {});
  const userdata = useQuery(GETUSER).data;

  console.log(data);
  if (data && userdata) {
    return (
      <div>
        <Navbar />
        <div className={classes.movielist}>
          <div className={classes.movies}>
            {data.movies
              .filter(
                (movie) => movie.creatorname === userdata.currentUser.username
              )
              .map((movie) => (
                <Movie key={movie.id} {...movie} />
              ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default MyMoviesPage;
