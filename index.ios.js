import {
		AppRegistry, Text, View, Dimensions, AsyncStorage
		} from 'react-native';

import React, { Component } from 'react';

import Root from './app/view/Root.js';
import window from './app/window-imitate';
import LoginWebView from './app/view/LoginWebView.js';

import createRootStore from './app/web/redux/store/store';
import { Provider } from 'react-redux';

import _clone from 'lodash/clone'
import _assign from 'lodash/assign'

import initSocket from './app/web/socket.js';




import {Promise} from 'es6-promise'
import initialStateJSON from './app/initialState.json';
// we need this platform detection in shared redux code
global.__isReactNative = true;

class breaker_mobile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialStateFetched: false,
			loggedIn: false,
			authCode: ''
		};

		var component = this;

		var authCodeResponse = function(value) {
			console.log("authCode stored value: "+value);
			if (value) {
				this.setState({
					authCode: value,
					loggedIn: true
				});

				this.setupAppFromInitialState();
			}
		};
		authCodeResponse = authCodeResponse.bind(this);

		AsyncStorage.getItem('authcode').then(authCodeResponse);
	}

	fetchInitialState() {
		return fetch('https://www.breakerapp.com/application/initialState', {
			headers: {
				'X-BreakerAccessCode': this.state.authCode
			}
		}).then((res) => {
			if (res.ok) {
				console.log("Got valid server response.");
				return res.json();
			} else {
				return null;
			}
		});
		// return new Promise((resolve) => resolve(initialStateJSON))
	};

	setupAppFromInitialState() {
      this.fetchInitialState()
        .then((__INITIAL_STATE__) => {
					if (__INITIAL_STATE__ == null) {
						console.log("Error getting initial state, logging out.");
						AsyncStorage.removeItem('authcode');
						this.setState({
							loggedIn: false,
							authCode: ''
						});

						return;
					}
          console.log('Processing initial state...');
          const reachedInitialState = _assign(__INITIAL_STATE__, {
            //currentRoom: 'zikapp'
            currentRoom: 'breakerapp'
          });

          const store = createRootStore(reachedInitialState);

          initSocket(store, this.state.authCode);

          this.setState({
            initialStateFetched: true,
            store: store
          })
        });
    }

	renderLoader() {
		const {height, width} = Dimensions.get('window');
		const wrapperStyles = {
			backgroundColor: '#333',
			alignItems: 'center',
			justifyContent: 'center',
			height,
			width,
		};
		return <View style={wrapperStyles}>
			<Text style={{
				fontSize: 32,
				color: 'white',
			}}>breakerapp</Text>
			<Text style={{
				fontSize: 17.4,
				color: '#ccc',
			}}>loading initial state...</Text>
		</View>
	}

	authCodeReceived(authCode) {
		console.log("Authcode received in main obj: " + authCode);

		AsyncStorage.setItem('authcode', authCode)
      .then(() => {
        this.setState({
          authCode: authCode,
          loggedIn: true
        });
        this.setupAppFromInitialState();
      });
	}

	render() {
		const {initialStateFetched, loggedIn, store} = this.state;

		if (!loggedIn) {
			return <LoginWebView
				onAuthCode={this.authCodeReceived.bind(this)}
			/>;
		} else if (initialStateFetched) {
			return <Provider store={store}>
				<Root />
			</Provider>;
		} else {
			return this.renderLoader()
		}
	}
}


AppRegistry.registerComponent('breaker_mobile', () => breaker_mobile);
