import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_MOVIE, MOVIES } from "../queries/index";

import Navbar from "../components/Navbar/Navbar";

import classes from "./pages styles/addmoviepage.module.scss";
import Alert from "sweetalert2";

const AddMoviePage = (props) => {
  const [createMovie, { loading, error }] = useMutation(CREATE_MOVIE, {
    onCompleted({ createMovie }) {
      Alert.fire("Added Movie succesfully!", "", "success");
      props.history.push("/main");
    },
    onError(createMovie) {
      Alert.fire("Error", "Please check inputs", "error");
    },
  });

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [duration, setDuration] = useState();
  const [actors, setActors] = useState();
  const [releaseDate, setReleaseDate] = useState();
  const [thumbnail, setThumbnail] = useState();

  const onSubmit = (e) => {
    createMovie({
      variables: {
        title,
        description,
        releaseDate,
        duration: +duration,
        thumbnail,
        actors,
      },
      refetchQueries: [
        {
          query: MOVIES,
        },
      ],
    });
  };
  return (
    <div>
      <Navbar />

      <div className={classes.form}>
        <h1>Add Movie</h1>
        <form autocomplete="off">
          <div className={classes.textfield}>
            <input
              type="text"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <span></span>
            <label>Movie Title:</label>
          </div>

          <div className={classes.textfield}>
            <input
              type="text"
              required
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span></span>
            <label>Description:</label>
          </div>

          <div className={classes.textfield}>
            <input
              type="number"
              required
              name="duration"
              step="1"
              onChange={(e) => setDuration(e.target.value)}
            />
            <span></span>
            <label>Duration:</label>
          </div>

          <div className={classes.textfield}>
            <input
              type="date"
              required
              name="date"
              onChange={(e) => setReleaseDate(e.target.value)}
            />
            <span></span>
            <label>Release Date:</label>
          </div>

          <div className={classes.textfield}>
            <input
              type="text"
              required
              name="pic"
              onChange={(e) => setThumbnail(e.target.value)}
            />
            <span></span>
            <label>Thumbnail Picture:</label>
          </div>

          <div className={classes.textfield}>
            <input
              type="text"
              required
              name="actors"
              onChange={(e) => setActors(e.target.value)}
            />
            <span></span>
            <label>Actors:</label>
          </div>
          <button
            type="button"
            className="button"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoviePage;
