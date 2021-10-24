import { combineReducers } from 'redux';
import airCraft from './Aircraft';
import region from './Region';
import flight from './Flight';
import language from './Language';

export default combineReducers({
  airCraft,
  region,
  flight,
  language,
});
