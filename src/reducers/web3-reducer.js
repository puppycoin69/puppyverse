import { ActionTypes } from '../actions';

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null,
  auth: null,
};

const Web3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_WEB3_PROVIDER:
      return {
        ...state,
        provider: action.payload.provider,
        web3Provider: action.payload.web3Provider,
        address: action.payload.address,
        chainId: action.payload.chainId,
        auth: action.payload.auth,
      };
    case ActionTypes.SET_ADDRESS:
      return {
        ...state,
        address: action.payload.address,
      };
    case ActionTypes.SET_CHAIN_ID:
      return {
        ...state,
        chainId: action.payload.chainId,
      };
    case ActionTypes.RESET_WEB3_PROVIDER:
      return initialState;
    default:
      return state;
  }
};

export default Web3Reducer;
