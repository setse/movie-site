import { useState } from "react";
import { NavLink } from "react-router-dom";

import LoginForm from "../components/Login/Login";
import RegisterForm from "../components/Register/Register";

import classes from "./pages styles/authpage.module.scss";
import Alert from "sweetalert2";

const AuthPage = () => {
  const [mode, setMode] = useState("login");

  const alertGuest = () => {
    Alert.fire(
      "You are entering as a Guest",
      "Guests cannot see movie details",
      "warning"
    );
  };

  return (
    <div>
      <div className={classes.intro}>
        <h2>Movie App</h2>
        <h5>Your favorite place to share movies and discuss!</h5>
      </div>
      <div className="row">
        {mode === "signup" ? (
          <div className={classes.link}>
            Already have an account?{" "}
            <button onClick={() => setMode("login")}>Login</button>
          </div>
        ) : (
          <div className={classes.link}>
            Don't have an account?{" "}
            <button onClick={() => setMode("signup")}>Sign Up</button>
            <NavLink to="/main" onClick={alertGuest}>
              {" "}
              <p>Enter as Guest</p>
            </NavLink>
          </div>
        )}
        {mode === "signup" ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default AuthPage;
