const window = {
	clearInterval: clearInterval,
	setInterval: setInterval,

	__ENVIRONMENT__: __DEV__ ? 'development' : 'production',

	__USER_GUEST__: true,
	__USER_ADMIN__: false,

	__WEBSOCKET_URL__: 'wss://www.breakerapp.com/websocket/room/socket?test=true',
	__ROOM_NAME__: 'breakerapp',

};



export default window;