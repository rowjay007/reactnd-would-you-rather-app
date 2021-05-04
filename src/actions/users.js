export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addUserQuestion(authUser, questionID) {
  return {
    type: ADD_USER_QUESTION,
    authUser,
    questionID,
  };
}

export function answerQuestion(authUser, questionID, option) {
  return {
    type: ANSWER_QUESTION,
    authUser,
    questionID,
    option,
  };
}
