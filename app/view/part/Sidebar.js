import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import I from 'immutable';

const STYLES = StyleSheet.create({
	wrapper: {
		backgroundColor: '#3a3f51'
	}
});

class Sidebar extends React.Component {
	static propTypes = {

	}
	static defaultProps = {
		activeRoomList: I.Map()
	}

	renderRoom(room, name) {
		const iconUrl = room.get('iconUrl');

		return <View key={name} style={STYLES['room']}>
			<Text style={STYLES['name']}>{room.get('displayName')}</Text>
			{iconUrl ? <Image style={STYLES['icon']} source={{uri: iconUrl}} /> : null}
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