// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import Web3Reducer from './web3-reducer';

const rootReducer = combineReducers({
  web3: Web3Reducer,
});

export default rootReducer;
