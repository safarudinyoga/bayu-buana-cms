import { combineReducers } from 'redux';
import airCraft from './Aircraft';
import flight from './Flight';

export default combineReducers({
  airCraft,
  flight,
});
