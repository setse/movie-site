import Alert from "sweetalert2";
export const AUTH_SUCCESS = "AUTH_SUCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const loginSucces = (token) => {
  localStorage.setItem("token", token);
  Alert.fire("Login succesful!", "", "success");
  return {
    type: "LOGIN_SUCCES",
    token,
  };
};

export const loginFail = (err) => {
  Alert.fire("Login failed", ` ${err}`, "error");
  return {
    type: "LOGIN_FAIL",
    error: err,
  };
};
