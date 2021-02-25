import { useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { MOVIE, GETUSER, DELETE_MOVIE } from "../queries/index";

import classes from "./pages styles/moviepage.module.scss";
import Stars from "react-star-ratings";
import Alert from "sweetalert2";

import Navbar from "../components/Navbar/Navbar";
import ReviewList from "../components/Review/ReviewList";

const MoviePage = (props) => {
  const { data, loading } = useQuery(MOVIE, {
    variables: { id: props.match.params.id },
  });

  const userdata = useQuery(GETUSER).data;

  const [deleteMovie, { loadingDel, errorDel }] = useMutation(DELETE_MOVIE, {
    onCompleted(deleteMovie) {
      Alert.fire("Deleted!");
      props.history.push("/mymovies");
      window.location.reload(false);
    },
    onError(deleteMovie) {
      Alert.fire("Cant delete!", "", "error");
    },
  });

  const deleteMovieHandler = () => {
    deleteMovie({
      variables: { id: props.match.params.id },
    });
  };
  // if (data.movie.creatorname === userdata.currentUser.username) {
  //   sameUser = "true";
  // }

  if (data && userdata) {
    const {
      thumbnail,
      duration,
      title,
      ratingsAvg,
      ratings,
      releaseDate,
      actors,
      addedDate,
      creatorname,
      description,
      id,
      reviews,
    } = data.movie;

    // const userdata = useQuery(GETUSER).data;
    // useEffect(() => {
    //   if (!loading) {
    //     userdata();
    //   }
    // });

    //   const sameUser = data.movie.creatorname === userdata.currentUser.username;
    // console.log(data.movie.reviews);

    return (
      <div>
        <Navbar />
        <div className={classes.moviebox}>
          <div className={classes.title}>
            <h3>{title}</h3>

            <div className={classes.creatordetails}>
              <p>Added by {creatorname} </p>
              <p> Added at {new Date(addedDate).toLocaleString()}</p>
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes.pictureside}>
              <img src={thumbnail} alt={title} />
              <br />
              <Stars
                rating={ratingsAvg}
                starRatedColor="gold"
                isSelectable={false}
                numberOfStars={5}
                name="rating"
                starDimension="25px"
              />
              <p>Rated {ratings} times</p>
              <p>Duration: {duration}min</p>
            </div>
            <div className={classes.textside}>
              <p>{description}</p> <br />
              <p>Release Date: {releaseDate}</p> <br />
              <p>Actors: {actors}</p> <br />
              {data.movie.creatorname === userdata.currentUser.username ? (
                <div className={classes.editbutton}>
                  <Link to={id + "/edit"}>
                    <button>Edit This Movie Details</button>
                  </Link>
                  <button onClick={deleteMovieHandler}>Delete</button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <ReviewList reviews={reviews} movieid={id} />
      </div>
    );
  }
  return "Please sign in to see movie details";
};

export default MoviePage;
