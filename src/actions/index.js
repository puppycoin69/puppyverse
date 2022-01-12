export const ActionTypes = {
  SET_WEB3_PROVIDER: 'SET_WEB3_PROVIDER',
  SET_ADDRESS: 'SET_ADDRESS',
  SET_CHAIN_ID: 'SET_CHAIN_ID',
  RESET_WEB3_PROVIDER: 'RESET_WEB3_PROVIDER',
};

export function setprovider(data) {
  return {
    type: ActionTypes.SET_WEB3_PROVIDER,
    payload: data,
  };
}

export function disconnect() {
  return {
    type: ActionTypes.RESET_WEB3_PROVIDER,
  };
}
