import { getInitialData } from "../utils/api";

// React Redux Loading Action Creators
import { showLoading, hideLoading } from "react-redux-loading";

// Action Creators
import { receiveUsers, addQuestion, handleSaveAnswerUser } from "./users";
import {
  receiveQuestions,
  handleSaveAnswerQuestion,
  handleAddNewQuestion,
} from "./questions";

// Async Action Creator for getting and sending the initial app data to the Redux Store
export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      // Dispatch the Initial Data Actions
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

// Async Action Creator for dispatching the actions related to a user voting on a question
export function handleSaveAnswer(qid, answer) {
  return (dispatch) => {
    dispatch(showLoading());

    dispatch(handleSaveAnswerQuestion(qid, answer));
    dispatch(handleSaveAnswerUser(qid, answer)).then(() =>
      dispatch(hideLoading())
    );
  };
}

// Async Action Creator for dispatching the actions related to a user creating a question
export function handleAddQuestion(optionOneText, optionTwoText, loginUser) {
  return (dispatch) => {
    dispatch(showLoading());

    return dispatch(handleAddNewQuestion(optionOneText, optionTwoText)).then(
      (question) => {
        dispatch(addQuestion(loginUser, question.question.id));
        dispatch(hideLoading());
      }
    );
  };
}
