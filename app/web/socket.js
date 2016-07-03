//import store from './redux/store/store';
import * as socketActions from './redux/actions/socket-actions';
import Config from './config';

import window from '../window-imitate'
let socket = null;
let lastPingTime = null;

function socketConnect () {
  let websocketUrl = Config.websocket_url.replace('ws:', 'wss:');
  socket = new WebSocket(websocketUrl, null);
}

function init(store) {

  socketConnect();

  let pingTimeout = null;


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

export default function (store) {
  if (!socket) {
    init(store);
  }

  return socket;
}
