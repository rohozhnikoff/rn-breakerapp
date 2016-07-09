import {
		AppRegistry, Text, View, Dimensions
		} from 'react-native';

import React, { Component } from 'react';

import Root from './app/view/Root.js';
import window from './app/window-imitate';

import createRootStore from './app/web/redux/store/store';
import { Provider } from 'react-redux';

import _clone from 'lodash/clone'
import _assign from 'lodash/assign'

import initSocket from './app/web/socket.js';




import {Promise} from 'es6-promise'
import initialStateJSON from './app/initialState.json';
const fetchInitialState = () => {
	return fetch('https://www.breakerapp.com/application/initialState?test=true').then((res) => res.json())
	//return new Promise((resolve) => resolve(initialStateJSON))
};

// we need this platform detection in shared redux code
global.__isReactNative = true;

class breaker_mobile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialStateFetched: false
		};

		// todo: why top level initialized two times?
		fetchInitialState()
				.then((__INITIAL_STATE__) => {
					console.log(555);
					const reachedInitialState = _assign(__INITIAL_STATE__, {
						currentRoom: 'zikapp'
					});

					const store = createRootStore(reachedInitialState);

					initSocket(store);

					this.setState({
						initialStateFetched: true,
						store: store
					})
				})
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

	render() {
		const {initialStateFetched, store} = this.state;

		if (initialStateFetched) {
			return <Provider store={store}>
				<Root />
			</Provider>;
		} else {
			return this.renderLoader()
		}
	}
}


AppRegistry.registerComponent('breaker_mobile', () => breaker_mobile);
