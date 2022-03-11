export const set = (state, action) => {
  return { ...state, translations: action.payload }
}
