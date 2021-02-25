const initState = {
  token: null,
  error: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCES":
      return { ...state, token: action.token, error: null };
    case "LOGIN_FAIL":
      return { ...state, token: null, error: action.error };
    default:
      return state;
  }
};
export default authReducer;
