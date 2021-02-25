import { useState } from "react";

import { MOVIE, EDIT_MOVIE } from "../queries/index";
import { useMutation, useQuery } from "@apollo/client";

import Navbar from "../components/Navbar/Navbar";

import classes from "./pages styles/addmoviepage.module.scss";
import Alert from "sweetalert2";

const EditMoviePage = (props) => {
  const [editMovie, { loading, error }] = useMutation(EDIT_MOVIE, {
    onCompleted({ editMovie }) {
      Alert.fire("Movie edited succesfully!", "", "success");
      props.history.push("/movie/" + id);
    },
    onError(editMovie) {
      Alert.fire("Error", "Please check inputs", "error");
    },
  });

  const { data } = useQuery(MOVIE, {
    variables: { id: props.match.params.id },
  });

  let initTitle = "";
  let initDescription = "";
  let initReleaseDate = "";
  let initDuration = 0;
  let initThumbnail = "";
  let initActors = [];
  let id = "";

  if (data && data.movie) {
    //console.log("IF PASSED");
    initTitle = data.movie.title;
    initDescription = data.movie.description;
    initReleaseDate = data.movie.releaseDate;
    initDuration = data.movie.duration;
    initThumbnail = data.movie.thumbnail;
    initActors = data.movie.actors;
    id = data.movie.id;
    //console.log("init title" + initTitle); checking if the title is changing
  }

  const onSubmit = (e) => {
    e.preventDefault();
    editMovie({
      variables: {
        id,
        title,
        description,
        releaseDate,
        duration: +duration,
        thumbnail,
        actors,
      },
    });
  };
  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [releaseDate, setReleaseDate] = useState(initReleaseDate);
  const [duration, setDuration] = useState(initDuration);
  const [thumbnail, setThumbnail] = useState(initThumbnail);
  const [actors, setActors] = useState(initActors);
  console.log("title : " + title);
  return (
    <div>
      <Navbar />

      <div className={classes.form}>
        <h1>Edit Movie Page</h1>
        <form autocomplete="off">
          <div className={classes.textfield}>
            <input
              type="text"
              required
              name="title"
              value={title}
              onInput={(e) => {
                setTitle(e.target.value);
                console.log("target" + e.target.value);
              }}
            />

            <span></span>
            <label>Movie Title:</label>
          </div>

          <div className={classes.textfield}>
            <input
              type="text"
              required
              name="description"
              value={description}
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
              value={duration}
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
              value={releaseDate}
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
              value={thumbnail}
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
              value={actors}
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

export default EditMoviePage;
