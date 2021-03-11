import data from './data';
import pokemon from './pokemon';
import filter from './filter';
import search from './search';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  data,
  pokemon,
  filter,
  search,
});

export default rootReducer;
