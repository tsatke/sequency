import * as types from "./type/type";
import * as user from "./util/user";
import * as translations from "./util/translation";
import defaultState from "./util/defaultState";

function reducer(state = defaultState, action) {
  switch (action.type) {
    case types.SET_USER_TOKEN:
      return user.setToken(state, action);
    case types.SET_USER:
      return user.set(state, action);
    case types.SET_TRANSLATION:
      return translations.set(state, action);
    default:
      return state;
  }
}

export default reducer;
