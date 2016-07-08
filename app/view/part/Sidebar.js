import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import I from 'immutable';
import Icon from '../component/Icon'

const STYLES = StyleSheet.create({
	wrapper: {
		backgroundColor: '#3a3f51',
		paddingTop: 70,
	},
	'room': {
		height: 50,
		flex: 1,
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10,
		alignItems: 'center',
		borderBottomWidth: .5,
		borderBottomColor: '#2f3344',
	},
	'name': {
		flex: 1,
		color: '#b4b6bd',
	},
	'users': {
		backgroundColor: 'rgb(180, 182, 189)',
		color: 'rgb(58, 63, 81)',
		borderRadius: 2,
		paddingLeft: 3,
		paddingRight: 3,
		fontSize: 12,
	},
	'avatar': {
		marginRight: 10
	},
});

class Sidebar extends React.Component {
	static propTypes = {}
	static defaultProps = {
		activeRoomList: I.Map()
	}

	renderRoom(room, name) {
		const iconUrl = room.get('iconUrl');

		return <View key={name} style={STYLES['room']}>
			<Icon uri={iconUrl} width={20} height={20} style={STYLES['avatar']} />
			<Text style={STYLES['name']}>{`#${room.get('displayName')}`}</Text>
			<Text style={STYLES['users']}>{room.get('activeUsers')}</Text>
		</View>
	}

	render() {
		const { activeRoomList } = this.props;

		return (<View style={STYLES['wrapper']}>
			{activeRoomList.map(this.renderRoom).toArray()}
		</View>)
	}
}


export default Sidebar;