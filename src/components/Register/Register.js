import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { REGISTER } from "../../queries/index";
import * as actions from "../../store/actions/authAction";

import classes from "./register.module.scss";
import Alert from "sweetalert2";

const RegisterForm = (props) => {
  const dispatch = useDispatch();

  const [register, { loadingRegister, errorRegister }] = useMutation(REGISTER, {
    onCompleted({ register }) {
      Alert.fire("Register Succes! Now you can login", "", "success");
      window.location.reload();
    },
    onError(errorRegister) {
      dispatch(actions.loginFail(errorRegister));
    },
  });

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const submit = useCallback(() => {
    register({ variables: { username, password } });
  }, [username, password]);

  return (
    <div className={classes.form}>
      <h1>Sign Up</h1>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default withRouter(RegisterForm);
