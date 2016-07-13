import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import ChatMessage from './message/ChatMessage';

const STYLES = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: '#fff'
	},
	scroll: {
		flex: 1,
		padding: 12,
	},
});

class Messages extends React.Component {
	renderMessage ({onMessagePress, users}, message) {
		return <ChatMessage
				key={message.get('uuid')}
				message={message}
				onPress={onMessagePress}
				user={users.get(message.get('username'))}
		/>
	}
	render() {
		const {messages, onMessagePress, users} = this.props;

		return (<View style={[this.props.style, STYLES['wrapper']]}>
			<ScrollView style={STYLES['scroll']}>
				{messages.reverse().map(this.renderMessage.bind(null, {onMessagePress, users}))}
			</ScrollView>
		</View>)
	}
}

Messages.defaultProps = {};
Messages.propTypes = {};

export default Messages;