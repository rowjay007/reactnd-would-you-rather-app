import {
  RECEIVE_USERS,
  ADD_USER_QUESTION,
  ANSWER_QUESTION,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_USER_QUESTION:
      return {
        ...state,
        [action.authUser]: {
          ...state[action.authUser],
          questions: state[action.authUser].questions.concat([
            action.questionID,
          ]),
        },
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.authUser]: {
          ...state[action.authUser],
          answers: {
            ...state[action.authUser].answers,
            [action.questionID]: action.option,
          },
        },
      };
    default:
      return state;
  }
}
