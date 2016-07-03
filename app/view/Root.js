import React, { Component } from 'react';

import { Text, View, PropTypes, StatusBar, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import Header from './Header'
import Messages from './Messages'
import MessageField from './MessageField'

import { getAllMessagesEntitiesForCurrentRoom } from '../web/redux/selectors/message-entities-selectors';

const {width, height} = Dimensions.get('window');

import { sendNewMessage } from '../web/redux/actions/chat-actions';

class Root extends React.Component {
	render() {
		const {roomName, messages, onSendNewMessage} = this.props;

		console.log('[Root::render]', this.props);

		return (<View style={this.props.style}>
			<StatusBar barStyle="light-content"/>

			<Header roomName={roomName} style={{height: height * 0.1}}/>

			<MessageField onSubmit={(text) => onSendNewMessage(roomName, text)} style={{height: height * 0.1}} />

			<Messages messages={messages} style={{height: height * 0.8}} />

		</View>)
	}
}

Root.defaultProps = {};
Root.propTypes = {};

function mapStateToProps(state) {
	return {
		roomName: state.get('currentRoom'),
		messages: getAllMessagesEntitiesForCurrentRoom(state)
	};
}


function mapDispatchToProps(dispatch) {
	return {
		onSendNewMessage(roomName, message) {
			dispatch(sendNewMessage({
				message,
				roomName
			}));
		}
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(Root);
