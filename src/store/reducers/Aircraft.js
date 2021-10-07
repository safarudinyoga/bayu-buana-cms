const initialState = {
  dataAircraft: {},
};
const aircraftReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'dataAircraft/fetch':
      return { ...state, dataAircraft: payload };
    default:
      return state;
  }
};
export default aircraftReducer;
