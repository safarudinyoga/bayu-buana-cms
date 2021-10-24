import axios from 'config/Axios';

export const fetchProvince = (payload) => {
    return async (dispatch) => {
        dispatch({type: 'province/loading', payload: true});
        try {
            let {data} = await axios.get('/province', {
                params: {page: 0, size: 9999999},
            });
            dispatch({type: 'dataAircraft/fetch', payload: data});
        } catch (err) {
            dispatch({type: 'province/error', payload: err});
        }
        dispatch({type: 'province/loading', payload: false});
    };
};

export const removeAircraft = (payload) => {
    return async (dispatch) => {
        dispatch({type: 'province/loading', payload: true});
        try {
            let respon = await axios.delete(`/province/${payload.id}`);
            return respon;
        } catch (err) {
            dispatch({type: 'province/error', payload: err});
        }
        dispatch({type: 'province/loading', payload: false});
    };
};

export const postAircraft = (payload) => {
    return async (dispatch) => {
        dispatch({type: 'province/loading', payload: true});
        try {
            let responAircraft = await axios.post('/province', payload.dataCraft);
            if (responAircraft.data.id) {
                // eslint-disable-next-line array-callback-return
                payload.dataTranslations.map((e) => {
                    dispatch(
                        postLanguageAircraft({
                            payloadLanguage: {
                                province_name: e.province_name,
                                language_code: e.language_code,
                                model: payload.dataCraft.model,
                            },
                            id: responAircraft.data.id,
                        }),
                    );
                });
            }
            return responAircraft.status;
        } catch (err) {
            dispatch({type: 'province/error', payload: err});
        }
        dispatch({type: 'province/loading', payload: false});
    };
};

export const postLanguageAircraft = (payload) => {
    return async (dispatch) => {
        dispatch({type: 'province/loading', payload: true});
        try {
            let responLanguage = await axios.post(
                `/province/${payload.id}/translations`,
                payload.payloadLanguage,
            );
            return responLanguage;
        } catch (err) {
            dispatch({type: 'province/error', payload: err});
        }
        dispatch({type: 'province/loading', payload: false});
    };
};

export const getAircraftById = (payload) => {
    return async (dispatch) => {
        dispatch({type: 'province/loading', payload: true});
        try {
            let {data} = await axios.get(`/province/${payload}`);

            dispatch({type: 'dataAircraftDetail/fetch', payload: data});
        } catch (err) {
            dispatch({type: 'province/error', payload: err});
        }
        dispatch({type: 'province/loading', payload: false});
    };
};
export const editAircraft = (payload) => {
    return async (dispatch) => {
        dispatch({type: 'province/loading', payload: true});
        try {
            let responEdit = await axios.put(
                `/province/${payload.id}`,
                payload.dataCraft,
            );
            if (responEdit.data.id) {
                // eslint-disable-next-line array-callback-return
                payload.dataTranslations.map((e) => {
                    dispatch(
                        putLanguageAircraft({
                            payloadLanguage: {
                                province_name: e.province_name,
                                language_code: e.language_code,
                                model: payload.dataCraft.model,
                            },
                            id: responEdit.data.id,
                            lang: e.language_code,
                        }),
                    );
                });
            }
            return responEdit.status;
        } catch (err) {
            dispatch({type: 'province/error', payload: err});
        }
        dispatch({type: 'province/loading', payload: false});
    };
};

export const putLanguageAircraft = (payload) => {
    return async (dispatch) => {
        dispatch({type: 'province/loading', payload: true});
        try {
            let responLanguage = await axios.put(
                `/province/${payload.id}/translations/${payload.lang}`,
                payload.payloadLanguage,
            );
            return responLanguage.status;
        } catch (err) {
            dispatch({type: 'province/error', payload: err});
        }
        dispatch({type: 'province/loading', payload: false});
    };
};

export const getAircraftLanguageById = (payload) => {
    return async (dispatch) => {
        dispatch({type: 'province/loading', payload: true});
        try {
            let {data} = await axios.get(`/province/${payload}/translations`);
            dispatch({
                type: 'dataAircraftLanguageDetail/fetch',
                payload: data.items,
            });
        } catch (err) {
            dispatch({type: 'province/error', payload: err});
        }
        dispatch({type: 'province/loading', payload: false});
    };
};

export const postBatchAction = (payload) => {
    return async (dispatch) => {
        dispatch({type: 'province/loading', payload: true});
        try {
            let ids = payload.ids;
            await axios.post('/batch-actions/' + payload.action + '/province', ids);
            dispatch(fetchProvince())
        } catch (err) {
            console.log(err);
            dispatch({type: 'province/error', payload: err});
        }
        dispatch({type: 'province/loading', payload: false});
    };
};
