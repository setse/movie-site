import Stars from "react-star-ratings";
import classes from "./review.module.scss";

const Review = (props) => {
  return (
    <div className={classes.review}>
      <h4>
        <div className={classes.username}>{props.review.user.username}</div>{" "}
        rated this movie with{" "}
        <div className={classes.username}>{props.review.rating} stars</div> and
        commented:
      </h4>
      <div className={classes.comment}>
        <h3>"{props.review.comment}"</h3>
        <Stars
          rating={props.review.rating}
          starRatedColor="gold"
          isSelectable={false}
          numberOfStars={5}
          name="rating"
          starDimension="30px"
        />
      </div>
    </div>
  );
};

export default Review;
