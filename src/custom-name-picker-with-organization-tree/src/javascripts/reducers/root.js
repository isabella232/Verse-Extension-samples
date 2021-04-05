import {combineReducers} from 'redux';
import {org, department, recipient} from './reducers';

export default combineReducers({
  org,
  department,
  recipient
});
