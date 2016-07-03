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

class breaker_mobile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			initialStateFetched: false
		};

		/* LOADING INITIAL STATE */
		fetch('https://www.breakerapp.com/application/initialState?test=true')
				.then((res) => res.json())
				.then((__INITIAL_STATE__) => {
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
		const wrapperStyles = {
			backgroundColor: '#333',
			alignItems: 'center',
			justifyContent: 'center',
			height: Dimensions.get('window').height,
			width: Dimensions.get('window').width
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

		console.log('[breaker_mobile::render]', {initialStateFetched, store}, store && store.getState());

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
