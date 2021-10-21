const initialState = {
    dataProvince: {},
    detailProvince: {},
    detailProvinceLanguage: [],
    isLoading: false,
    error: null,
};
const provinceReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case 'dataProvince/fetch':
            return {...state, dataProvince: payload};

        case 'dataProvinceDetail/fetch':
            return {...state, detailProvince: payload};

        case 'dataProvinceLanguageDetail/fetch':
            return {...state, detailProvinceLanguage: payload};

        case 'province/loading':
            return {...state, isLoading: payload};

        case 'province/error':
            return {...state, error: payload};

        default:
            return state;
    }
};
export default provinceReducer;
