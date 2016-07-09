import React, { Component } from 'react';

import { Text, View, PropTypes, StatusBar, Dimensions, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import Header from './part/Header'
import Messages from './Messages'
import MessageField from './MessageField'

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
	}
});


class Root extends React.Component {
	render() {
		const { roomName, messages, onSendNewMessage, connected,
				isSidebarOpen, toggleSidebarHandle,
				activeRoomList, roomList, onRoomChange
				} = this.props;

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

					<MessageField onSubmit={(text) => onSendNewMessage(roomName, text)} style={{height: height * 0.1}} />

					<Messages messages={messages} style={{height: height * 0.8}} />
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


export default connect(mapStateToProps, mapDispatchToProps)(Root);
