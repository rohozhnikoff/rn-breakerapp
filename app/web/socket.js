//import store from './redux/store/store';
import * as socketActions from './redux/actions/socket-actions';
import Config from './config';

import window from '../window-imitate'
let socket = null;
let lastPingTime = null;

import RNReconnectingWebSocket from '../rn-reconnecting-websocket.js'

function socketConnect (authCode) {
  let websocketUrl = Config.websocket_url.replace('ws:', 'wss:') + authCode;
  const socketOptions = {
    debug: false,
    reconnectInterval: 5000,
    reconnectDecay: 1.5,
    timeoutInterval: 15000,
  };
  socket = new RNReconnectingWebSocket(websocketUrl, null, socketOptions);
}

function init(store, authCode) {

  socketConnect(authCode);

  let pingTimeout = null;


  const _originalSend = socket.send.bind(socket);

  socket.send = (msg) => {
    console.log('[SOCKET::send]', msg);
    if (socket.readyState) {
      _originalSend(msg)
    } else {
      console.warn('[CustomError]: Socket is not connected');
    }
  };

  socket.onopen = (event) => {
    console.log('[SOCKET::onopen]', event);
    store.dispatch(socketActions.handleSocketOpen(store, socket));
  };

  socket.onclose = (event) => {
    console.log('[SOCKET::onclose]', event);
    store.dispatch(socketActions.handleSocketClose(store, socket));
  };

  socket.onmessage = (event) => {
    const eventData = JSON.parse(event.data);
    console.log('[SOCKET::onmessage]', eventData);
    store.dispatch(socketActions.onSocketMessage(eventData));
  };

  socket.startRoomPing = (room) => {
    console.log('[SOCKET::startRoomPing]', room);
    if (pingTimeout) {
      window.clearInterval(pingTimeout);
    }

    if (!lastPingTime) {
      lastPingTime = Date.now();
    }

    pingTimeout = window.setInterval(() => {
      console.log('[SOCKET::pingTimeout]');
      if (socket.readyState !== 1) {
        console.log('[SOCKET::pingTimeout]', "Can't ping, connection not open.");  // eslint-disable-line
        return;
      }

      if (Date.now() - lastPingTime > Config.settings.max_stale_state_millis) {
        console.log('[SOCKET::pingTimeout]', 'Ping overtime - refreshing state and reconnecting!');  // eslint-disable-line
        store.dispatch(socketActions.handleStateRefresh());
        socketConnect();
      }

      lastPingTime = Date.now();
      socket.sendPing(room);
    }, Config.settings.ping_timeout);
  };

  socket.stopRoomPing = () => {
    console.log('[SOCKET::stopRoomPing]');
    if (pingTimeout) {
      window.clearInterval(pingTimeout);
    }
  };

  socket.sendPing = (room) => {
    console.log('[SOCKET::sendPing]', room);
    socket.send(JSON.stringify({
      message: '##ping##',
      roomName: room
    }));
  };

  socket.sendMemberList = (room) => {
    console.log('[SOCKET::sendMemberList]', room);
    socket.send(JSON.stringify({
      message: '##memberlist##',
      roomName: room
    }));
  };

  socket.sendRoomMessagesSeen = (room) => {
    console.log('[SOCKET::sendRoomMessagesSeen]', room);
    socket.send(JSON.stringify({
      message: '##markmessagesread##',
      roomName: room
    }));
  };
}

export default function (store, authCode) {
  if (!socket) {
    init(store, authCode);
  }

  return socket;
}
