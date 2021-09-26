import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import globalReducer from '../reducers/Global';
import thunk from 'redux-thunk';
const reducers = combineReducers({
  globalReducer,
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));
export default store;
