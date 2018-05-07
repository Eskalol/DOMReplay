'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseButton = function (_HTMLButtonElement) {
	_inherits(BaseButton, _HTMLButtonElement);

	function BaseButton(domreplay) {
		_classCallCheck(this, BaseButton);

		var _this = _possibleConstructorReturn(this, (BaseButton.__proto__ || Object.getPrototypeOf(BaseButton)).call(this));

		_this.domreplay = domreplay;
		_this.addEventListener('click', _this.handleOnClickEvent);
		_this.innerHTML = _this.text;
		_this.id = _this.id;
		_this.classNames = _this.classNames.join(' ');
		return _this;
	}

	_createClass(BaseButton, [{
		key: 'handleOnClickEvent',
		value: function handleOnClickEvent() {}
	}, {
		key: 'classNames',
		get: function get() {
			return ['dom-hud-btn'];
		}
	}, {
		key: 'id',
		get: function get() {
			return undefined;
		}
	}, {
		key: 'text',
		get: function get() {
			return '';
		}
	}]);

	return BaseButton;
}(HTMLButtonElement);

exports.default = BaseButton;