'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Logger Singleton class,
 * used for debug, error and warning logging
 */
var Logger = function () {
	function Logger() {
		_classCallCheck(this, Logger);

		if (!this.instance) {
			this._debug = false;
			this.instance = this;
		}
		return this.instance;
	}

	/**
  * Debug logging.
  * @param  {String} message - message to log.
  */


	_createClass(Logger, [{
		key: 'debug',
		value: function debug(message) {
			if (this._debug) {
				console.log('%c[DOMReplay - Debug]: ' + message, 'background: #222; color: #bada55');
			}
		}

		/**
   * Warning logging.
   * @param  {String} message - message to log
   */

	}, {
		key: 'warning',
		value: function warning(message) {
			console.warn('[DOMReplay - Debug]: ' + message);
		}

		/**
   * Error logging.
   * @param  {String} message - message to log
   */

	}, {
		key: 'error',
		value: function error(message) {
			console.error('[DOMReplay - Debug]: ' + message);
		}

		/**
   * Set to true if we should log debug information
   * @param  {Boolean} debug - true if debug
   */

	}, {
		key: 'logging',
		set: function set(debug) {
			this._debug = debug;
		}
	}]);

	return Logger;
}();

exports.default = new Logger();