import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import ChatMessage from './message/ChatMessage';
import _partialRight from 'lodash/partialRight'
import InvertibleScrollView from 'react-native-invertible-scroll-view';



const STYLES = StyleSheet.create({
	wrapper: {
		flex: 1
	},
	scroll: {
		flex: 1,
		padding: 12,
	},
});

class Messages extends React.Component {
	renderMessage (list, message, i, messages, {onMessagePress, users}) {
		list.push(
				<ChatMessage
						previousMessage={messages.get(i + 1)}
						key={message.get('uuid')}
						message={message}
						onPress={onMessagePress}
						user={users.get(message.get('username'))}
				/>
		);
		return list;
	}
	render() {
		const {messages, onMessagePress, users} = this.props;


		return (<View style={[this.props.style, STYLES['wrapper']]}>
			<InvertibleScrollView style={STYLES['scroll']} inverted>
				{messages.reverse().reduce(_partialRight(this.renderMessage, {onMessagePress, users}), [])}
			</InvertibleScrollView>
		</View>)
	}
}

Messages.defaultProps = {};
Messages.propTypes = {};

export default Messages;