import { Link } from "react-router-dom";

import classes from "./movie.module.scss";

const Movie = (props) => {
  const { title, releaseDate, thumbnail, id } = props;

  return (
    <div className={classes.moviestyle}>
      <Link to={"movie/" + id}>
        <h3>{title}</h3>
        <p>{releaseDate}</p>
        <img src={thumbnail} alt={title} />
      </Link>
    </div>
  );
};

export default Movie;
