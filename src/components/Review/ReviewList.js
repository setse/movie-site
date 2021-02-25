import { useState } from "react";
import { useMutation } from "@apollo/client";

import Review from "./Review";
import { ADD_REVIEW, MOVIE } from "../../queries/index";

import classes from "./reviewlist.module.scss";
import Stars from "react-star-ratings";
import Alert from "sweetalert2";

const ReviewList = (props) => {
  const [addReview, { loading, error }] = useMutation(ADD_REVIEW, {
    onCompleted({ addReview }) {
      Alert.fire("Review added succesfully!", "", "success");
    },
    onError(error) {
      if (error.message.includes("E11000 duplicate key error collection")) {
        Alert.fire("Error", "You have already submitted a review", "error");
      } else if (
        error.message.includes(
          "Review validation failed: comment: Path `comment` is required."
        )
      ) {
        Alert.fire("Error", "Please include a comment!", "error");
      } else {
        Alert.fire("Error", `${error}`, "error");
      }
    },
  });

  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  //const [movie, setMovie] = useState();

  const onPost = (e) => {
    e.preventDefault();
    addReview({
      variables: {
        rating: +rating,
        comment,
        movie: props.movieid,
      },
      refetchQueries: [
        {
          query: MOVIE,
          variables: { id: props.movieid },
        },
      ],
    });
  };

  console.log(props);

  if (1 === 1) {
    return (
      <div className={classes.reviews}>
        <div className={classes.title}>
          <h1>User Reviews</h1>
        </div>
        <div className={classes.comments}>
          {props.reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
        <div className={classes.reviewinput}>
          <form>
            <div className={classes.input}>
              <label>Comment</label>
              <input type="text" onChange={(e) => setComment(e.target.value)} />
              <label>Rating</label>
              <Stars
                rating={rating}
                starRatedColor="gold"
                changeRating={setRating}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
              />
            </div>
          </form>
          <button type="submit" onClick={(e) => onPost(e)}>
            Submit
          </button>
        </div>
      </div>
    );
  }
  return null;
};

export default ReviewList;
