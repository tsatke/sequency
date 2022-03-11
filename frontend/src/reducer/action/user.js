import * as types from '../type/type'

export const setUserToken = (token) => ({
  type: types.SET_USER_TOKEN,
  payload: token,
})

export const setUser = (user) => ({
  type: types.SET_USER,
  payload: user,
})
