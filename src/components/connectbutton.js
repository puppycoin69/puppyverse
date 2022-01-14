/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router';
import Web3Modal from 'web3modal';
import { connect } from 'react-redux';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import { ethers, providers } from 'ethers';
import { setprovider, disconnect } from '../actions/index';
import ellipseAddress from '../lib/utilities';
import abi from '../files/Puppycoin.json';

const INFURA_ID = '7e40f3eda5f949dc820627f0f2b1e158';

const CONTRACT_ADDRESS = '0x2696Fc1896F2D5F3DEAA2D91338B1D2E5f4E1D44';

const providerOptions = {
  // Example with injected providers
  injected: {
    display: {
      // logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      name: 'METAMASK',
      description: 'CONNECT WITH THE PROVIDER IN YOUR BROWSER',
    },
    package: null,
  },
  // Example with WalletConnect provider
  walletconnect: {
    display: {
      // logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      name: 'MOBILE',
      description: 'SCAN QRCODE WITH YOUR MOBILE WALLET',
    },
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'COINBASE',
      description: 'CONNECT TO COINBASE WALLET (NOT COINBASE APP)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};

const connectbutton = (props) => {
  const web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  });

  const connect = async () => {
    const provider = await web3Modal.connect();

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();

    const address = await signer.getAddress();

    const network = await web3Provider.getNetwork();

    let contract;
    try {
      contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        abi.abi,
        signer,
      );
    } catch (err) {
      console.log(err);
      console.error('Error initializing contract');
    }

    const pupbalance = await contract.balanceOf(address);
    console.log(pupbalance.toNumber());

    let authresponse = 0;
    if (pupbalance.toNumber() >= 1000000 * 1000) {
      authresponse = 1;
    }

    console.log(authresponse);

    props.setprovider(
      {
        provider,
        address,
        web3Provider,
        chainId: network.chainId,
        auth: authresponse,
      },
    );

    if (authresponse === 1) {
      props.history.push('/millisonly');
    }
  };

  const disconnect = useCallback(
    async () => {
      await web3Modal.clearCachedProvider();
      if (props.provider?.disconnect && typeof props.provider.disconnect === 'function') {
        await props.provider.disconnect();
      }
      props.disconnect();
    },
    [props.provider],
  );

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, []);

  //   // eslint-disable-next-line consistent-return
  //   useEffect(() => {
  //     if (props.provider?.on) {
  //       const handleAccountsChanged = (accounts) => {
  //         // eslint-disable-next-line no-console
  //         console.log('accountsChanged', accounts);
  //         dispatch({
  //           type: 'SET_ADDRESS',
  //           address: accounts[0],
  //         });
  //       };

  //       const handleChainChanged = (accounts) => {
  //         // eslint-disable-next-line no-console
  //         console.log('accountsChanged', accounts);
  //         dispatch({
  //           type: 'SET_ADDRESS',
  //           address: accounts[0],
  //         });
  //       };

  //       const handleDisconnect = (error) => {
  //         // eslint-disable-next-line no-console
  //         console.log('disconnect', error);
  //         disconnect();
  //       };

  //       props.provider.on('accountsChanged', handleAccountsChanged);
  //       props.provider.on('chainChanged', handleChainChanged);
  //       props.provider.on('disconnect', handleDisconnect);

  //       // Subscription Cleanup
  //       return () => {
  //         if (props.provider.removeListener) {
  //           props.provider.removeListener('accountsChanged', handleAccountsChanged);
  //           props.provider.removeListener('chainChanged', handleChainChanged);
  //           props.provider.removeListener('disconnect', handleDisconnect);
  //         }
  //       };
  //     }
  //   }, [props.provider, disconnect]);

  return (
    <div id="walletbuttoncontainer">
      {props.web3Provider ? (
        <div role="button" onClick={disconnect} className="walletbutton">
          {ellipseAddress(props.address)}
        </div>
      ) : (
        <div role="button" onClick={connect} className="walletbutton">
          CONNECT WALLET
        </div>
      )}
      {(props.web3Provider)
        ? ((props.auth === 1)
          ? (<div />)
          : (
            <div id="buy-more-prompt">
              You&apos;re not a puppillionare. Head over to <a href="https://puppycoin.fun" target="_blank" rel="noopener noreferrer">puppycoin.fun</a> to buy some more PUP!
            </div>
          )) : (
            <div />
        )}
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

export default withRouter(connect(mapStateToProps, { setprovider, disconnect })(connectbutton));
