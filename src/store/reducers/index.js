import { combineReducers } from 'redux';
import airCraft from './Aircraft';
import region from './Region';
import flight from './Flight';

export default combineReducers({
  airCraft,
  region,
  flight,
});
