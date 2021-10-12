import axios from '../../config/Axios';

export const fetchAircraft = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'aircraft/loading', payload: true });
    try {
      let { data } = await axios.get('/aircraft');
      dispatch({ type: 'dataAircraft/fetch', payload: data });
    } catch (err) {
      dispatch({ type: 'aircraft/error', payload: err });
    }
    dispatch({ type: 'aircraft/loading', payload: false });
  };
};

export const removeAircraft = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'aircraft/loading', payload: true });
    try {
      let respon = await axios.delete(`/aircraft/${payload.id}`);
      console.log(respon, 'respon');
    } catch (err) {
      dispatch({ type: 'aircraft/error', payload: err });
    }
    dispatch({ type: 'aircraft/loading', payload: false });
  };
};
export const postAircraft = (payload) => {
  console.log(payload, 'payload form');
  return async (dispatch) => {
    dispatch({ type: 'aircraft/loading', payload: true });
    try {
      let respon = await axios.post('/aircraft', payload);
      console.log(respon, 'respon form');
    } catch (err) {
      dispatch({ type: 'aircraft/error', payload: err });
    }
    dispatch({ type: 'aircraft/loading', payload: false });
  };
};

export const getAircraftById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'aircraft/loading', payload: true });
    try {
      let { data } = await axios.get(`/aircraft/${payload}`);
      console.log(data, 'data edit');
      dispatch({ type: 'dataAircraftDetail/fetch', payload: data });
    } catch (err) {
      dispatch({ type: 'aircraft/error', payload: err });
    }
    dispatch({ type: 'aircraft/loading', payload: false });
  };
};
export const editAircraft = (payload) => {
  console.log(payload, 'payload edit');
  return async (dispatch) => {
    dispatch({ type: 'aircraft/loading', payload: true });
    try {
      let respon = await axios.put(`/aircraft/${payload.id}`, payload.data);
      console.log(respon, 'respon form edit');
    } catch (err) {
      dispatch({ type: 'aircraft/error', payload: err });
    }
    dispatch({ type: 'aircraft/loading', payload: false });
  };
};
