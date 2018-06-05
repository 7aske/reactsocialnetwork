export default class Request {
	constructor(method, url, json = null, headers = null) {
		this.method = method;
		this.url = url;
		this.json = json;
		this.headers = headers;
	}
	send() {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open(this.method, this.url, true);
			if (this.headers) {
				for (let key in this.headers) {
					xhr.setRequestHeader(key, this.headers[key]);
				}
			}
			xhr.send(this.json);
			xhr.onerror = function() {
				reject({
					status: xhr.status,
					response: xhr.responseText
				});
			};
			xhr.onload = function() {
				resolve({
					status: xhr.status,
					response: xhr.responseText
				});
			};
		});
	}
}
