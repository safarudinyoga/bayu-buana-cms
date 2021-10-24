import axios from '../../config/Axios';

export const fetchLanguage = (payload) => {
  return async (dispatch) => {
    dispatch({ type: 'language/loading', payload: true });
    try {
      let { data } = await axios.get('/languages');
      dispatch({ type: 'dataLanguage/fetch', payload: data.items });
    } catch (err) {
      dispatch({ type: 'language/error', payload: err });
    }
    dispatch({ type: 'language/loading', payload: false });
  };
};
