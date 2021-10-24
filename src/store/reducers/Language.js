const initialState = {
  dataLanguage: [],
  isLoading: false,
  error: null,
};
const languageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'dataLanguage/fetch':
      return { ...state, dataLanguage: payload };

    case 'language/loading':
      return { ...state, isLoading: payload };
    case 'language/error':
      return { ...state, error: payload };

    default:
      return state;
  }
};
export default languageReducer;
