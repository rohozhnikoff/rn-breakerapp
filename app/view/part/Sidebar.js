import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
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

	'room-block': {
		marginTop: 10,
		marginBottom: 30
	},
	'room-title': {
		color: '#8b8e99',
		fontSize: 12,
		marginLeft: 10,
	},
	'room-list': {},
});

class Sidebar extends React.Component {
	static propTypes = {}
	static defaultProps = {
		activeRoomList: I.Map(),
		roomList: I.Map(),
	}

	renderRoom(onRoomChange, room, name) {
		const iconUrl = room.get('iconUrl');

		return <TouchableOpacity onPress={onRoomChange.bind(null, name)} key={name} activeOpacity={.5}>
			<View style={STYLES['room']}>
				<Icon uri={iconUrl} width={20} height={20} style={STYLES['avatar']} />
				<Text style={STYLES['name']}>{`#${room.get('displayName')}`}</Text>
				<Text style={STYLES['users']}>{room.get('activeUsers')}</Text>
			</View>
		</TouchableOpacity>
	}

	render() {
		const { activeRoomList, onRoomChange, roomList } = this.props;

		return (<View style={STYLES['wrapper']}>
			<View style={STYLES['room-block']}>
				<Text style={STYLES['room-title']}>Active rooms</Text>
				<View style={STYLES['room-list']}>
					{roomList.map(this.renderRoom.bind(null, onRoomChange)).toArray()}
				</View>
			</View>
			<View style={STYLES['room-block']}>
				<Text style={STYLES['room-title']}>Active rooms</Text>
				<View style={STYLES['room-list']}>
					{activeRoomList.map(this.renderRoom.bind(null, () => { console.log('implement @join@ feature first') })).toArray()}
				</View>
			</View>
		</View>)
	}
}


export default Sidebar;