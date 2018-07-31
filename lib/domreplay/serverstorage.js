'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerStorage = function () {
	function ServerStorage() {
		_classCallCheck(this, ServerStorage);

		if (!this.instance) {
			this.instance = this;
		}
		return this.instance;
	}

	_createClass(ServerStorage, [{
		key: 'setApiUrl',
		value: function setApiUrl(apiUrl) {
			this.apiUrl = apiUrl;
		}
	}, {
		key: 'load',
		value: function load(id) {
			var _this = this;

			var headers = new Headers();
			headers.append('Content-Type', 'application/json');
			var config = {
				method: 'GET',
				headers: headers
			};
			console.log('fetch Url: ' + this.apiUrl + '/' + id);
			return fetch(this.apiUrl + '/' + id, config).then(function (response) {
				if (response.status === 200) {
					_logger2.default.debug('GET ' + _this.apiUrl + ' returned with status ' + response.status);
					_logger2.default.debug('' + response.body);
					return response.json();
				} else {
					throw new Error('GET ' + _this.apiUrl + ' returned with status ' + response.status);
				}
			}).catch(function (error) {
				_logger2.default.error(error);
			});
		}
	}, {
		key: 'push',
		value: function push(data) {
			var headers = new Headers();
			headers.append('Content-Type', 'application/json');
			var config = {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(data)
			};

			return fetch(this.apiUrl, config).then(function (response) {
				return response.json();
			}).then(function (response) {
				console.log(response);
				return response;
			}).catch(function (error) {
				_logger2.default.error(error);
			});
		}
	}]);

	return ServerStorage;
}();

exports.default = new ServerStorage();