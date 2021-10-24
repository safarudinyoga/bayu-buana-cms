const initialState = {
  dataRegion: {},
  detailRegion: {},
  isLoading: false,
  detailRegionLanguage: [],
  error: null,
};
const regionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'dataRegion/fetch':
      return { ...state, dataRegion: payload };
    case 'dataRegionDetail/fetch':
      return { ...state, detailRegion: payload };
    case 'dataRegionLanguageDetail/fetch':
      return { ...state, detailRegionLanguage: payload };
    case 'region/loading':
      return { ...state, isLoading: payload };
    case 'region/error':
      return { ...state, error: payload };

    default:
      return state;
  }
};
export default regionReducer;
