import { useState, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions/authAction";
import { LOGIN } from "../../queries/index";

import classes from "./login.module.scss";

const LoginForm = (props) => {
  const dispatch = useDispatch();

  const [login, { loadingLogin, errorLogin }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      dispatch(actions.loginSucces(login.token));
      props.history.push("/main");
    },
    onError(errorLogin) {
      dispatch(actions.loginFail(errorLogin));
    },
  });

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const submit = useCallback(() => {
    login({ variables: { username, password } });
  }, [username, password]);

  return (
    <div className={classes.form}>
      <h1>Log In</h1>
      <form>
        <div className={classes.textfield}>
          <input
            type="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <span></span>
          <label htmlFor="username">Username</label>
        </div>
        <div className={classes.textfield}>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <span></span>
          <label htmlFor="password">Password</label>
        </div>
        <button
          type="submit"
          className="button"
          onClick={(e) => {
            submit();
            e.preventDefault();
          }}
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
