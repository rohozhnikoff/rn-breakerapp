const makeAxiosConsistent = (query) => query.then((res) => res.json()).then((data) => {data});
const addTestCredentials = (url) => url + '?test=true';
const makeAbsolutePath = (url) => 'https://www.breakerapp.com' + url;


const API = {
  requestInitialState() {
    return makeAxiosConsistent(
        fetch(makeAbsolutePath(addTestCredentials('/application/initialState')))
    )
  },

  leaveRoom(roomName) {
    return makeAxiosConsistent(
        fetch(makeAbsolutePath(addTestCredentials(`/application/leaveRoom?roomName=${roomName}`)))
    )
  },

  fetchMoreMessages(roomName, fromMessageId, count) {
    return makeAxiosConsistent(
        fetch(makeAbsolutePath(addTestCredentials(`/application/getmessages?roomName=${roomName}&id=${fromMessageId}&limit=${count}&before=true`)))
    )
  },

  fetchMoreActiveRooms(limit, offset) {
    return makeAxiosConsistent(
        fetch(makeAbsolutePath(addTestCredentials(`/application/getactiverooms?limit=${limit}&offset=${offset}`)))
    )
  }
};

export default API;
