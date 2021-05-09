import { RECEIVE_USERS, SAVE_QUESTION, ADD_QUESTION } from "../actions/users";

// Users Reducer Function
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };

    case SAVE_QUESTION:
      return {
        ...state,
        [action.loginUser]: {
          ...state[action.loginUser],
          answers: {
            ...state[action.loginUser].answers,
            [action.qid]: action.answer,
          },
        },
      };

    case ADD_QUESTION:
      return {
        ...state,
        [action.loginUser]: {
          ...state[action.loginUser],
          questions: state[action.loginUser].questions.concat(action.qid),
        },
      };

    default:
      return state;
  }
}
