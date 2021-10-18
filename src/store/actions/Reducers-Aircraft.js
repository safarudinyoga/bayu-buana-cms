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
// Put
export const putAircraft = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'aircraft/loading', payload: true });
    try {
      let respon = await axios.put(`/aircraft/${payload.id}`, payload.data);
      console.log(respon, 'respon');
    } catch (err) {
      dispatch({ type: 'aircraft/error', payload: err });
    }
    dispatch({ type: 'aircraft/loading', payload: false });
  };
};

export const postAircraft = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'aircraft/loading', payload: true });
    try {
      let responAircraft = await axios.post('/aircraft', payload.dataCraft);

      if (responAircraft.data.id) {
        payload.dataTransalations.map((e) => {
          dispatch(
            postLanguageAircraft({
              payloadLanguage: {
                aircraft_name: e.languageValue,
                language_code: e.languageCode,
                model: payload.dataCraft.model,
              },
              id: responAircraft.data.id,
            }),
          );
        });
      }
    } catch (err) {
      dispatch({ type: 'aircraft/error', payload: err });
    }
    dispatch({ type: 'aircraft/loading', payload: false });
  };
};

export const postLanguageAircraft = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'aircraft/loading', payload: true });
    try {
      let responLanguage = await axios.post(
        `/aircraft/${payload.id}/translations`,
        payload.payloadLanguage,
      );
      console.log(responLanguage, 'respon language');
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

      dispatch({ type: 'dataAircraftDetail/fetch', payload: data });
    } catch (err) {
      dispatch({ type: 'aircraft/error', payload: err });
    }
    dispatch({ type: 'aircraft/loading', payload: false });
  };
};
export const editAircraft = (payload) => {
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
