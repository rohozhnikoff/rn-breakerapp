import React, {Component} from 'react';
import {WebView} from 'react-native';

class LoginWebView extends Component {

  render() {
    return (
      <WebView
        source={{uri: 'https://www.breakerapp.com/application/startAuthForMobileApp'}}
        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
        style={{marginTop: 20}}
      />
    );
  }

  onShouldStartLoadWithRequest(event) {
    // Implement any custom loading logic here, don't forget to return!
    console.log('Loading: '+event.url);
    if (event.url.startsWith('breaker://auth')) {
      var authCode = event.url.substring(event.url.lastIndexOf('/') + 1);
      console.log('Received breaker auth code: ' + authCode);
      this.props.onAuthCode(authCode);
      return true;
    }
    return true;
  }
}

LoginWebView.propTypes = {
  onAuthCode: React.PropTypes.func.isRequired
};

export default LoginWebView;