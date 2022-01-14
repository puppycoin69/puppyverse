/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ConnectButton from '../components/connectbutton';

const temp = (props) => {
  useEffect(() => {
    if (props.auth !== 1) {
      props.history.push('/');
    }
  }, [props.auth]);

  return (
    <div id="tempmaincontainer">
      <div id="puplogo2" />
      <div id="milititle">Welcome to the puppyverse puppillionare. New adventures coming soon.....</div>
      <ConnectButton />
    </div>
  );
};

const mapStateToProps = (state) => (
  {
    provider: state.web3.provider,
    web3Provider: state.web3.web3Provider,
    address: state.web3.address,
    chainId: state.web3.chainId,
    auth: state.web3.auth,
  }
);

export default withRouter(connect(mapStateToProps, null)(temp));
