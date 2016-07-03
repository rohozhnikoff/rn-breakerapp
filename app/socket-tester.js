const socket = new WebSocket('wss://www.breakerapp.com/websocket/room/socket?test=true');

socket.onopen = function(ev) {
	console.log('onopen', ev);

	socket.send(
			JSON.stringify(
					{
						message: '[message from dev-app] // ' + Date.now(),
						roomName: 'zikapp'
					}
			)
	);
};
socket.onerror = function(ev) {
	console.log('onerror', ev);
};
socket.onclose = function(ev) {
	console.log('onclose', ev);
};
socket.onmessage = function(ev) {
	console.log('onmessage', ev, JSON.parse(ev.data));
};


export default socket