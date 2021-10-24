import axios from '../../config/Axios';

export const fetchRegion = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'region/loading', payload: true });
    try {
      let { data } = await axios.get('/regions', {
        params: { page: 0, size: 9999999 },
      });
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
      let responRegion = await axios.post('/regions', payload.dataRegion);
      console.log(responRegion, 'res reg');
      console.log(payload.dataTranslations, 'lag');
      if (responRegion.data.id) {
        // eslint-disable-next-line array-callback-return
        payload.dataTranslations.map((e) => {
          dispatch(
            postLanguageRegion({
              payloadLanguage: {
                region_name: e.region_name,
                language_code: e.language_code,
              },
              id: responRegion.data.id,
            }),
          );
        });
      }
      return responRegion.status;
    } catch (err) {
      dispatch({ type: 'region/error', payload: false });
    }
    dispatch({ type: 'region/loading', payload: false });
  };
};

export const postLanguageRegion = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'region/loading', payload: true });
    try {
      let responLanguage = await axios.post(
        `/regions/${payload.id}/translations`,
        payload.payloadLanguage,
      );
      console.log(responLanguage, 'res lag');
      return responLanguage;
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
      let responEdit = await axios.put(
        `/regions/${payload.id}`,
        payload.dataRegion,
      );

      if (responEdit.data.id) {
        // eslint-disable-next-line array-callback-return
        payload.dataTranslations.map((e) => {
          dispatch(
            putLanguageRegion({
              payloadLanguage: {
                region_name: e.region_name,
                language_code: e.language_code,
              },
              id: responEdit.data.id,
              lang: e.language_code,
            }),
          );
        });
      }
      return responEdit.status;
    } catch (err) {
      dispatch({ type: 'region/error', payload: err });
    }
    dispatch({ type: 'region/loading', payload: false });
  };
};
export const putLanguageRegion = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'region/loading', payload: true });
    try {
      let responLanguage = await axios.put(
        `/regions/${payload.id}/translations/${payload.lang}`,
        payload.payloadLanguage,
      );
      return responLanguage.status;
    } catch (err) {
      dispatch({ type: 'region/error', payload: err });
    }
    dispatch({ type: 'region/loading', payload: false });
  };
};

export const getRegionLanguageById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'region/loading', payload: true });
    try {
      let { data } = await axios.get(`/regions/${payload}/translations`);
      console.log(data, 'det');
      dispatch({
        type: 'dataRegionLanguageDetail/fetch',
        payload: data.items,
      });
    } catch (err) {
      dispatch({ type: 'region/error', payload: err });
    }
    dispatch({ type: 'region/loading', payload: false });
  };
};
export const postBatchAction = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'aircraft/loading', payload: true });
    try {
      let ids = payload.ids;
      await axios.post('/batch-actions/' + payload.action + '/region', ids);
      // rahman
      // todo : apakah bisa langsung dispatch ke function lain?
      dispatch(fetchRegion());
    } catch (err) {
      console.log(err);
      dispatch({ type: 'aircraft/error', payload: err });
    }
    dispatch({ type: 'aircraft/loading', payload: false });
  };
};
