import { gql } from "@apollo/client";

//Auth

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const GETUSER = gql`
  query currentUser {
    currentUser {
      id
      username
    }
  }
`;

//Movie

export const MOVIES = gql`
  query movies {
    movies {
      id
      title
      description
      releaseDate
      addedDate
      duration
      actors
      thumbnail
      ratings
      ratingsAvg
      creatorname
    }
  }
`;

export const MOVIE = gql`
  query movie($id: String!) {
    movie(id: $id) {
      id
      title
      description
      releaseDate
      addedDate
      duration
      actors
      thumbnail
      ratings
      ratingsAvg
      creatorname
      reviews {
        id
        rating
        comment
        movie
        user {
          id
          username
        }
      }
    }
  }
`;

//Adding Movies

export const CREATE_MOVIE = gql`
  mutation createMovie(
    $title: String!
    $description: String!
    $releaseDate: String!
    $duration: Int!
    $actors: [String!]
    $thumbnail: String!
  ) {
    createMovie(
      title: $title
      description: $description
      releaseDate: $releaseDate
      duration: $duration
      actors: $actors
      thumbnail: $thumbnail
    ) {
      id
      title
      description
      releaseDate
      duration
      actors
      thumbnail
    }
  }
`;

export const EDIT_MOVIE = gql`
  mutation editMovie(
    $id: String!
    $title: String!
    $description: String!
    $releaseDate: String!
    $duration: Int!
    $actors: [String!]
    $thumbnail: String!
  ) {
    editMovie(
      id: $id
      title: $title
      description: $description
      releaseDate: $releaseDate
      duration: $duration
      actors: $actors
      thumbnail: $thumbnail
    ) {
      id
      title
      description
      releaseDate
      duration
      actors
      thumbnail
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation deleteMovie($id: String!) {
    deleteMovie(id: $id)
  }
`;

//Review

export const ADD_REVIEW = gql`
  mutation addReview($comment: String!, $rating: Int!, $movie: String!) {
    addReview(comment: $comment, rating: $rating, movie: $movie) {
      id
      rating
      comment
    }
  }
`;
