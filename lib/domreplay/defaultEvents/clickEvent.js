'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventbaseclass = require('../eventbaseclass');

var _eventbaseclass2 = _interopRequireDefault(_eventbaseclass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Basic Click Event.
 */
var ClickEvent = function (_EventBaseClass) {
	_inherits(ClickEvent, _EventBaseClass);

	function ClickEvent() {
		_classCallCheck(this, ClickEvent);

		return _possibleConstructorReturn(this, (ClickEvent.__proto__ || Object.getPrototypeOf(ClickEvent)).apply(this, arguments));
	}

	_createClass(ClickEvent, [{
		key: 'handler',
		value: function handler(element) {
			var trail = this.makeTrailForElement(element);
			this.syncStore({ trail: trail });
		}
	}, {
		key: 'replay',
		value: function replay(eventObject) {
			var _this2 = this;

			return this.trackElementOnTrail(eventObject.trail).then(function (element) {
				_this2.addDomReplayBorderToElement(element);
				return _this2.executeTimingRelative(function () {
					element.click();
					_this2.removeDomReplayBorderFromElement(element);
					return element;
				});
			}).then(function () {
				return _this2.executeTimingRelative(function () {});
			});
		}
	}, {
		key: 'eventType',
		get: function get() {
			return 'click';
		}
	}, {
		key: 'tagnames',
		get: function get() {
			return ['button', 'a'];
		}
	}]);

	return ClickEvent;
}(_eventbaseclass2.default);

exports.default = ClickEvent;