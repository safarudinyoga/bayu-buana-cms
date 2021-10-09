const initialState = {
  dataAircraft: {},
  detailAircraft: {},
};
const aircraftReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'dataAircraft/fetch':
      return { ...state, dataAircraft: payload };

    case 'dataAircraftDetail/fetch':
      return { ...state, detailAircraft: payload };

    default:
      return state;
  }
};
export default aircraftReducer;
