import Logger from './logger';

class ServerStorage {
	static instance;

	constructor() {
		if (!this.instance) {
			this.instance = this;
		}
		return this.instance;
	}

	setApiUrl(apiUrl) {
		this.apiUrl = apiUrl;
	}

	load(id) {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const config = {
			method: 'GET',
			headers
		};
		console.log(`fetch Url: ${this.apiUrl}/${id}`);
		return fetch(`${this.apiUrl}/${id}`, config)
			.then(response => {
				if (response.status === 200) {
					Logger.debug(`GET ${this.apiUrl} returned with status ${response.status}`);
					Logger.debug(`${response.body}`);
					return response.json();
				} else {
					throw new Error(`GET ${this.apiUrl} returned with status ${response.status}`);
				}
			}).catch(error => {
				Logger.error(error);
			});
	}

	push(data) {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const config = {
			method: 'POST',
			headers,
			body: JSON.stringify(data)
		};

		return fetch(this.apiUrl, config)
			.then(response => response.json())
			.then(response => {
				console.log(response);
				return response;
			})
			.catch(error => {
				Logger.error(error);
			});
	}
}

export default new ServerStorage();
