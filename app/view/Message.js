import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const STYLES = StyleSheet.create({
	wrapper: {
		marginBottom: 10
	},
	username: {
		fontWeight: '600',
		color: '#4F5264',
		fontSize: 15,
	},
	message: {
		color: '#58666e',
		fontSize: 14,
		marginTop: 2
	},
	line: {
		height: 1,
		backgroundColor: '#cfdadd',
		marginTop: 6
	}
});

class Message extends React.Component {
	render() {
		const {username, message} = this.props;

		return (<View style={STYLES['wrapper']}>
			<Text style={STYLES['username']}>{username}</Text>
			<Text style={STYLES['message']}>{message}</Text>
			<View style={STYLES['line']} />
		</View>)
	}
}

Message.defaultProps = {};
Message.propTypes = {};

export default Message;