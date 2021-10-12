const initialState = {
  dataAircraft: {},
  detailAircraft: {},
  isLoading: false,
  error: null,
};
const aircraftReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'dataAircraft/fetch':
      return { ...state, dataAircraft: payload };

    case 'dataAircraftDetail/fetch':
      return { ...state, detailAircraft: payload };

    case 'aircraft/loading':
      return { ...state, isLoading: payload };
    case 'aircraft/error':
      return { ...state, error: payload };

    default:
      return state;
  }
};
export default aircraftReducer;
