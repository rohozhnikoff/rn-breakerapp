import {
		AppRegistry, Text, View, Dimensions, AsyncStorage, StyleSheet
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
import API from './app/API';


// we need this platform detection in shared redux code
global.__isReactNative = true;

class breaker_mobile extends Component {
	constructor(props) {
		super(props);

		this.onAuthCode = this.onAuthCode.bind(this);

		this.state = {
			initialStateFetched: false,
			loggedIn: false,
		};

		AsyncStorage.getItem('authcode')
				.then((authCode) => authCode && this.onAuthSuccess(authCode));
	}

	onAuthSuccess(authCode) {
		this.setState({
			authCode: authCode,
			loggedIn: true
		}, () => {
			API.setAuthCode(authCode).fetchInitialState().then((__INITIAL_STATE__) => {
				if (__INITIAL_STATE__ == null) {
					console.log("Error getting initial state, logging out.");
					this.onAuthFailure();
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
		});
	}

	onAuthFailure() {
		AsyncStorage.removeItem('authcode');

		this.setState({
			loggedIn: false,
			authCode: ''
		});
	}

	onAuthCode(authCode) {
		console.log('authcode received', authCode);
		AsyncStorage.setItem('authcode', authCode)
				.then(this.onAuthSuccess.bind(this, authCode));
	}


	renderLoader() {
		const {height, width} = Dimensions.get('window');
		const wrapperStyles = {
			alignItems: 'center',
			backgroundColor: '#333',
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


	render() {
		const {initialStateFetched, loggedIn, store} = this.state;

		if (!loggedIn) {
			return <LoginWebView
					onAuthCode={this.onAuthCode}
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
