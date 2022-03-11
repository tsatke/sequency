import * as types from '../type/types'

export const setTranslation = (langKey) => ({
  type: types.SET_TRANSLATION,
  payload: langKey,
})
