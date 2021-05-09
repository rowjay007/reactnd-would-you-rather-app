export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

// Login User Action Creator
export function loginUser(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}

// Logout User Action Creator
export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
