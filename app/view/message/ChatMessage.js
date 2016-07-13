import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import TimeAgo from 'react-native-timeago';
import Icon from '../component/Icon';


const STYLES = StyleSheet.create({
	'wrapper': {
		marginBottom: 10,
		flexDirection: 'row'
	},
	'first-line': {
		flex: 1,
		alignItems: 'stretch',
		flexDirection: 'row',
		marginBottom: 5
	},

	'username': {
		fontWeight: '600',
		color: '#4F5264',
		fontSize: 15,
		flex: 1
	},
	'date': {
		flex: 1,
		fontSize: 12,
		textAlign: 'right',
		color: '#666',
		marginTop: 3
	},
	'message': {
		color: '#58666e',
		fontSize: 14,
	},
	'avatar': {

	},
	'avatar-col': {
		flex: 1
	},
	'message-col': {
		flex: 6
	},
	'status': {
		width: 6,
		height: 6,
		borderRadius: 3,
		alignSelf: 'center',
		marginTop: 3,
		marginRight: 5,
	},
	'status-online': {
		backgroundColor: 'green',
	},
	'status-offline': {
		backgroundColor: 'gray'
	},
});

// todo: make timeZone shift calculation
// const timeZoneOffset = Math.abs((new Date()).getTimezoneOffset() / 60);

class ChatMessage extends React.Component {
	isntRepeated() {
		const {previousMessage, message} = this.props;

		if(!previousMessage) {
			return true
		}
		return previousMessage.get('username') !== message.get('username')
	}
	renderCredentials({user, message}) {
		return <View style={STYLES['first-line']}>
			<View style={[STYLES['status'],
				user.get('online') ? STYLES['status-online'] : STYLES['status-offline']]} />

			<Text style={STYLES['username']}>{message.get('username')}</Text>
			<Text style={STYLES['date']}><TimeAgo time={new Date(message.get('createDate'))} /></Text>
		</View>
	}
	render() {
		const {message, onPress, user} = this.props;
		const isntRepeated = this.isntRepeated();

		return (<TouchableOpacity onPress={onPress.bind(null, message.get('username'))}>
			<View style={STYLES['wrapper']}>
				<View style={STYLES['avatar-col']}>
					{isntRepeated && <Icon uri={user.get('profileImageUrl')} width={30} height={30} style={STYLES['avatar']} />}
				</View>

				<View style={STYLES['message-col']}>
					{isntRepeated && this.renderCredentials({user, message})}
					<Text style={STYLES['message']}>{message.get('message')}</Text>
				</View>

			</View>
		</TouchableOpacity>
		)
	}
}

ChatMessage.defaultProps = {};
ChatMessage.propTypes = {
	previousMessage: PropTypes.object,
	onPress: PropTypes.func
};

export default ChatMessage;