import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

const STYLES = StyleSheet.create({
	'wrapper': {
		backgroundColor: '#3a3f51',
		padding: 12,
		paddingTop: 28,

		flexDirection: 'row'
	},
	'title': {
		color: '#eaebed',
		fontSize: 22,
	},
	'sandwich-wrapper': {
		marginRight: 12,
		borderRadius: 4,
	},
	'sandwich': {
		fontSize: 20,
		color: 'white',
		paddingLeft: 8,
		paddingRight: 8,
		paddingBottom: 3,
		backgroundColor: 'rgba(0,0,0, .2)',
		borderRadius: 4,
	},
	status: {
		fontSize: 15
	},
	'status-online': {
		color: 'green'
	},
	'status-offline': {
		color: 'green'
	}
});

class Header extends React.Component {
	static propTypes = {
		roomName: PropTypes.string,
		connected: PropTypes.bool,
		isSidebarOpen: PropTypes.bool,
		onSandwichPress: PropTypes.func,
	}

	render() {
		const {connected, isSidebarOpen, onSandwichPress, roomName} = this.props;

		return (<View style={[this.props.style, STYLES['wrapper']]}>

			<TouchableHighlight onPress={onSandwichPress} style={STYLES['sandwich-wrapper']}>
				<Text style={STYLES['sandwich']}>{isSidebarOpen ? '-' : '+'}</Text>
			</TouchableHighlight>

			<Text style={STYLES['title']}>
				{`#${roomName} `}
				<Text style={[STYLES['status'], {color: connected ? 'green' : 'gray'}] }>({connected ? 'online' : 'offline'})</Text>
			</Text>
		</View>)
	}
}

Header.defaultProps = {};

export default Header;