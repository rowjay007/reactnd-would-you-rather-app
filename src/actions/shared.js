import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { receiveUsers, addUserQuestion, answerQuestion } from "./users";
import { receiveQuestions, addQuestion, addQuestionAnswer } from "./questions";
import { setAuthUser } from "./authUser";

const AUTHED_ID = null;

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveQuestions(questions));
        dispatch(receiveUsers(users));
        dispatch(setAuthUser(AUTHED_ID));
      })
      .catch(function (error) {
        alert("There was an error loading initial data: ", error);
      });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authUser } = getState();


    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addUserQuestion(authUser, question.id));
      })
      .catch(function (error) {
        alert("There was an error adding new question:", error);
      });
  };
}

export function handleAnswerQuestion(questionID, option) {
  return (dispatch, getState) => {
    const { authUser } = getState();


    return saveQuestionAnswer({
      authUser,
      qid: questionID,
      answer: option,
    })
      .then(() => {
        dispatch(answerQuestion(authUser, questionID, option));
        dispatch(addQuestionAnswer(authUser, questionID, option));
      })
      .catch(function (error) {
        alert("There was an error answering a question: ", error);
      });
  };
}
