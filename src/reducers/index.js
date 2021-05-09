import { combineReducers } from "redux";

// Reducer Functions
import users from "./users";
import questions from "./questions";
import loginUser from "./loginUser";

// React Redux Loading Bar
import { loadingBarReducer } from "react-redux-loading";

// Root Reducer Function
export default combineReducers({
  users,
  questions,
  loginUser,
  loadingBar: loadingBarReducer,
});
