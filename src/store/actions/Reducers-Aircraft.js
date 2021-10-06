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
    dispatch({ type: 'aricraft/loading', payload: false });
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
    dispatch({ type: 'aricraft/loading', payload: false });
  };
};
