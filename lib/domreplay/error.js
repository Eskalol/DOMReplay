'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Constants and error objects which is thrown
 */

var STATE_ERROR = exports.STATE_ERROR = 'STATE_ERROR';

var createStateError = exports.createStateError = function createStateError(message) {
	return {
		type: STATE_ERROR,
		message: message
	};
};

var STORAGE_ERROR = exports.STORAGE_ERROR = 'STORAGE_ERROR';

var createStorageError = exports.createStorageError = function createStorageError(message) {
	return {
		type: STORAGE_ERROR,
		message: message
	};
};

/**
 * Thrown when the framework is wrongly used.
 * Please read error and fix it.
 */

var ProgrammingError = exports.ProgrammingError = function (_Error) {
	_inherits(ProgrammingError, _Error);

	function ProgrammingError(message) {
		var _ref;

		_classCallCheck(this, ProgrammingError);

		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_ref = ProgrammingError.__proto__ || Object.getPrototypeOf(ProgrammingError)).call.apply(_ref, [this, 'DOM-Replay programming Error: ' + message].concat(args)));

		_this.name = _this.constructor.name;
		Error.captureStackTrace(_this, _this.constructor);
		return _this;
	}

	return ProgrammingError;
}(Error);