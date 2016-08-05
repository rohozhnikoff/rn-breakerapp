import React, {Component, PropTypes} from 'react';
import {WebView, View} from 'react-native';

class LoginWebView extends Component {
	static propTypes = {
		onAuthCode: PropTypes.func.isRequired
	};

	render() {
		return (
				<View style={{flex: 1, padding: 8, paddingTop: 22, backgroundColor: '#3a3f51'}}>
					<View style={{borderWidth: 2, borderColor: 'rgba(255, 255, 255, .5)', flex: 1,}}>
						<WebView
								source={{uri: 'https://www.breakerapp.com/application/startAuthForMobileApp'}}
								onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
						/>
					</View>
				</View>
		);
	}

	onShouldStartLoadWithRequest(event) {
		// Implement any custom loading logic here, don't forget to return!
		console.log('[LoginWebView]', 'Loading: ' + event.url);

		if (event.url.startsWith('breaker://auth')) {
			const authCode = event.url.substring(event.url.lastIndexOf('/') + 1);

			console.log('Received breaker auth code: ' + authCode);

			this.props.onAuthCode(authCode);
		}

		return true;
	}
}

export default LoginWebView;