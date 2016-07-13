import React, { Component } from 'react';

import { Text, View, PropTypes, StatusBar, Dimensions, StyleSheet, Animated, TextInput } from 'react-native';
import { connect } from 'react-redux';

import Header from './part/Header'
import Messages from './Messages'

import { getAllMessagesEntitiesForCurrentRoom } from '../web/redux/selectors/message-entities-selectors';
import { getAllActiveRooms } from '../web/redux/selectors/active-rooms-selector';
import { getAllRooms } from '../web/redux/selectors/rooms-selectors';
import { getSidebarOpen } from '../web/redux/selectors/ui-selectors';

import { handleChangeRoom } from '../web/redux/actions/chat-actions';
import { toggleSidebar } from '../web/redux/actions/menu-actions';

const {width, height} = Dimensions.get('window');

import { sendNewMessage } from '../web/redux/actions/chat-actions';

import SideWrapper from 'react-native-side-menu';
import Sidebar from './part/Sidebar';


const STYLES = StyleSheet.create({
	wrapper: {},
	content: {
		backgroundColor: 'white'
	},
	'message-field': {
		backgroundColor: '#edf1f2',
		padding: 12
	},
	'message-input': {
		borderColor: '#cfdadd',
		borderWidth: 1,
		height: 40,
		fontSize: 18,
		backgroundColor: 'white',
		padding: 5
	},
});


class Root extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			fieldText: ''
		}
	}

	render() {
		const { roomName, messages, connected, users, isSidebarOpen, activeRoomList, roomList,
				toggleSidebarHandle, onSendNewMessage, onRoomChange,
		} = this.props;

		const { fieldText } = this.state;


		return (<View style={STYLES['wrapper']}>
			<StatusBar barStyle="light-content"/>

			<SideWrapper isOpen={isSidebarOpen}
					menu={<Sidebar activeRoomList={activeRoomList} roomList={roomList} onRoomChange={onRoomChange}  />}
					animationFunction={(prop, value) => Animated.timing(prop, { toValue: value, duration: 222 })}
			>
				<View style={STYLES['content']}>
					<Header
							roomName={roomName}
							style={{height: height * 0.1}}
							connected={connected}
							isSidebarOpen={isSidebarOpen}
							onSandwichPress={toggleSidebarHandle}
					/>

					<View style={[STYLES['message-field'], {height: height * 0.1}]}>
						<TextInput style={STYLES['message-input']}
								onSubmitEditing={() => onSendNewMessage(roomName, fieldText)}
								value={fieldText}
								onChangeText={(text) => this.setState({fieldText: text})}
						/>
					</View>


					<Messages messages={messages} users={users} style={{height: height * 0.8}}
							onMessagePress={(user) => this.setState({fieldText: addUser(fieldText, user)})} />
				</View>
			</SideWrapper>
		</View>)
	}
}

Root.defaultProps = {};
Root.propTypes = {};

function mapStateToProps(state) {
	return {
		roomName: state.get('currentRoom'),
		messages: getAllMessagesEntitiesForCurrentRoom(state),
		users: state.get('users'),
		connected: state.get('ui').get('connected'),

		isSidebarOpen: getSidebarOpen(state),

		activeRoomList: getAllActiveRooms(state),
		roomList: getAllRooms(state),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSendNewMessage(roomName, message) {
			dispatch(sendNewMessage({
				message,
				roomName
			}));
		},
		toggleSidebarHandle() {
			return dispatch(toggleSidebar());
		},
		onRoomChange(roomName) {
			dispatch(handleChangeRoom(roomName));
		}
	};
}

// todo: should be in reducer
function addUser (fieldText, user) {
	const _user = '@' + user;

	if(fieldText.indexOf(_user) !== -1) {
		return fieldText
	} else if (fieldText === '') {
		return _user
	} else {
		return fieldText + ' ' + _user;
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Root);
