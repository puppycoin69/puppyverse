/* eslint-disable jsx-a11y/interactive-supports-focus */
import React from 'react';
import ConnectButton from '../components/connectbutton';

const Welcome = (props) => {
  return (
    <div id="maincontainer">
      <div id="puplogo" />
      <div id="puptitle">PUPPILLIONAIRES ONLY</div>
      <ConnectButton />
      <div id="pupsubtitle">coming soon...</div>
    </div>
  );
};

export default Welcome;
