'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventbaseclass = require('../eventbaseclass');

var _eventbaseclass2 = _interopRequireDefault(_eventbaseclass);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Basic Input Event.
 */
var CustomInputEvent = function (_EventBaseClass) {
	_inherits(CustomInputEvent, _EventBaseClass);

	function CustomInputEvent() {
		_classCallCheck(this, CustomInputEvent);

		return _possibleConstructorReturn(this, (CustomInputEvent.__proto__ || Object.getPrototypeOf(CustomInputEvent)).apply(this, arguments));
	}

	_createClass(CustomInputEvent, [{
		key: 'handler',
		value: function handler(element) {
			_logger2.default.debug('Input event handler');
			var lastEvent = this.getLastStored();
			var trail = this.makeTrailForElement(element);
			if (lastEvent && JSON.stringify(this.makeTrailForElement(element)) === JSON.stringify(lastEvent.trail)) {
				_logger2.default.debug('Updates last event');
				this.updateLastStored({ value: element.value });
			} else {
				this.syncStore({
					value: element.value,
					trail: trail
				});
			}
		}
	}, {
		key: 'replay',
		value: function replay(eventObject) {
			var _this2 = this;

			var value = eventObject.value;

			return this.trackElementOnTrail(eventObject.trail).then(function (element) {
				_this2.addDomReplayBorderToElement(element);
				element.focus();
				return new Promise(function (resolve) {
					var index = 0;
					var time = setInterval(function () {
						if (index === eventObject.value.length) {
							clearInterval(time);
							return resolve(element);
						}
						element.value = value.substring(0, index + 1);
						var inputEvent = new InputEvent('input', { bubbles: true, data: value[index], inputType: 'insertText' });
						var textInputEvent = new Event('textInput', { bubbles: true, data: value[index] });
						element.dispatchEvent(inputEvent);
						element.dispatchEvent(textInputEvent);
						index++;
					}, _this2.timing * 0.1);
				});
			}).then(function (element) {
				return _this2.executeTimingRelative(function () {
					_this2.removeDomReplayBorderFromElement(element);
					return element;
				}, 0.5);
			});
		}
	}, {
		key: 'eventType',
		get: function get() {
			return 'input';
		}
	}, {
		key: 'tagnames',
		get: function get() {
			return ['input', 'textarea'];
		}
	}]);

	return CustomInputEvent;
}(_eventbaseclass2.default);

exports.default = CustomInputEvent;