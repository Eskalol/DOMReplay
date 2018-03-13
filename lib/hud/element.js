'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = function (_HTMLElement) {
	_inherits(Element, _HTMLElement);

	function Element() {
		var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
		var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

		_classCallCheck(this, Element);

		return _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this));
	}

	return Element;
}(HTMLElement);

var Button = exports.Button = function (_HTMLButtonElement) {
	_inherits(Button, _HTMLButtonElement);

	function Button() {
		var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
		var onClick = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

		_classCallCheck(this, Button);

		var _this2 = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

		_this2.innerHTML = text;
		_this2.id = id;
		_this2.onClick = onClick;
		_this2.className = 'dom-hud-btn ' + classes;
		return _this2;
	}

	return Button;
}(HTMLButtonElement);