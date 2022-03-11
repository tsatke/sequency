import * as types from "../type/type";

export const setToken = (token) => ({
  type: types.SET_USER_TOKEN,
  payload: token,
});

export const set = (user) => ({
  type: types.SET_USER,
  payload: user,
});
