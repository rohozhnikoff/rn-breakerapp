var authCode = '';

const API = {
	setAuthCode(_authCode) {
		authCode = _authCode;
		return this;
	},

	fetchInitialState() {
		return this.fetchJSON('https://www.breakerapp.com/application/initialState')
	},

	fetchJSON(url, params = {}) {
		return fetch(url, Object.assign({}, params, {
			'X-BreakerAccessCode': authCode,
		})).then((res) => res.ok ? res.json() : null);
	}
};


export default API;