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
		flex: 5
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
	render() {
		const {message, onPress, user} = this.props;

		return (<TouchableOpacity onPress={onPress.bind(null, message.get('username'))}>
			<View style={STYLES['wrapper']}>
				<View style={STYLES['avatar-col']}>
					{this.isntRepeated() && <Icon uri={user.get('profileImageUrl')} width={40} height={40} style={STYLES['avatar']} />}
				</View>

				<View style={STYLES['message-col']}>
					<View style={STYLES['first-line']}>

						<View style={[STYLES['status'],
							user.get('online') ? STYLES['status-online'] : STYLES['status-offline']]} />

						<Text style={STYLES['username']}>{message.get('username')}</Text>
						<Text style={STYLES['date']}><TimeAgo time={message.get('createDate')} /></Text>
					</View>
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