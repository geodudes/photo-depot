import { combineReducers } from 'redux';
import photosReducer from './photosReducer';
// import reducers written in other files here

const reducers = combineReducers({ photos: photosReducer });
// add object with each property being a reducer

export default reducers;
