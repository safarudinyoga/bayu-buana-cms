import axios from '../../config/Axios';

export const fetchRegion = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'region/loading', payload: true });
    try {
      let { data } = await axios.get('/regions');
      dispatch({ type: 'dataRegion/fetch', payload: data });
    } catch (err) {
      dispatch({ type: 'region/error', payload: err });
    }
    dispatch({ type: 'region/loading', payload: false });
  };
};

export const removeRegion = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'region/loading', payload: true });
    try {
      let respon = await axios.delete(`/regions/${payload.id}`);
      console.log(respon, 'respon');
    } catch (err) {
      dispatch({ type: 'region/error', payload: err });
    }
    dispatch({ type: 'region/loading', payload: false });
  };
};
export const postRegion = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'region/loading', payload: true });
    try {
      let respon = await axios.post('/regions', payload);
      console.log(respon, 'respon form');
    } catch (err) {
      dispatch({ type: 'region/error', payload: err });
    }
    dispatch({ type: 'region/loading', payload: false });
  };
};

export const getRegionById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'region/loading', payload: true });
    try {
      let { data } = await axios.get(`/regions/${payload}`);

      dispatch({ type: 'dataRegionDetail/fetch', payload: data });
    } catch (err) {
      dispatch({ type: 'region/error', payload: err });
    }
    dispatch({ type: 'region/loading', payload: false });
  };
};
export const editRegion = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'region/loading', payload: true });
    try {
      let respon = await axios.put(`/regions/${payload.id}`, payload.data);
      console.log(respon, 'respon form edit');
    } catch (err) {
      dispatch({ type: 'region/error', payload: err });
    }
    dispatch({ type: 'region/loading', payload: false });
  };
};
