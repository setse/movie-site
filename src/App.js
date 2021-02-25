import "./App.scss";

import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import AddMoviePage from "./pages/AddMoviePage";
import MyMoviesPage from "./pages/MyMoviesPage";
import MoviePage from "./pages/MoviePage";
import EditMoviePage from "./pages/EditMoviePage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/main" exact component={MainPage} />
        <Route path="/addmovie" exact component={AddMoviePage} />
        <Route path="/mymovies" exact component={MyMoviesPage} />
        <Route path="/movie/:id" exact component={MoviePage} />
        <Route path="/movie/:id/edit" exact component={EditMoviePage} />
        <Route path="/" component={AuthPage} />
      </Switch>
    </Router>
  );
}

export default App;
