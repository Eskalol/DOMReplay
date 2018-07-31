'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('../');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var div = function div() {
	var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	var div = document.createElement('div');
	div.className = classes;
	div.id = id;
	return div;
};

var input = function input() {
	var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

	var input = document.createElement('input');
	input.type = 'text';
	input.className = classes;
	input.setAttribute(_.domreplayIgnoreAttributeName, '');
	return input;
};

var button = function button() {
	var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

	var button = document.createElement('button');
	button.innerHTML = text;
	button.id = id;
	button.className = 'dom-hud-btn ' + classes;
	button.setAttribute(_.domreplayIgnoreAttributeName, '');
	return button;
};

var Modal = function () {
	function Modal() {
		_classCallCheck(this, Modal);

		this.modalContainer = div('dom-modal');
		this.modalContent = div('dom-modal-content');
		this.close = document.createElement('span');
		this.close.className = 'dom-modal-close';
		this.close.setAttribute(_.domreplayIgnoreAttributeName, '');
		this.close.addEventListener('click', this.getCloseHandler());
		this.modalContent.appendChild(this.close);
		this.modalContainer.appendChild(this.modalContent);
	}

	_createClass(Modal, [{
		key: 'getCloseHandler',
		value: function getCloseHandler() {
			var modalContainer = this.modalContainer;
			return function () {
				modalContainer.parentNode.removeChild(modalContainer);
			};
		}
	}, {
		key: 'createInputCopyButtonPair',
		value: function createInputCopyButtonPair(text, inputValue) {
			var container = div();
			container.innerHTML = '<span>' + text + '</span>';
			var urlInput = input();
			urlInput.value = inputValue;
			var copyButton = button('', 'info');
			var innerButtonSpan = document.createElement('span');
			innerButtonSpan.className = 'copy';
			innerButtonSpan.innerText = '    Copy';
			copyButton.appendChild(innerButtonSpan);
			copyButton.addEventListener('click', function () {
				urlInput.select();
				document.execCommand("copy");
			});
			container.appendChild(urlInput);
			container.appendChild(copyButton);
			return container;
		}
	}, {
		key: 'handleResponse',
		value: function handleResponse(promise) {
			var _this = this;

			var p = document.createElement('p');
			p.innerText = 'Pushing data to server...';
			this.modalContent.appendChild(p);
			promise.then(function (data) {
				console.log(data);
				p.parentNode.removeChild(p);
				_this.modalContent.appendChild(_this.createInputCopyButtonPair('Normal link:   ', data.url));
				_this.modalContent.appendChild(_this.createInputCopyButtonPair('Autoplay link:   ', data.autoplayUrl));
			});
		}
	}, {
		key: 'getShareButtonHandler',
		value: function getShareButtonHandler() {
			var urlInput = this.urlInput;
			return function () {
				urlInput.select();
				document.execCommand("copy");
			};
		}
	}, {
		key: 'render',
		value: function render() {
			var body = document.getElementsByTagName('body')[0];
			body.prepend(this.modalContainer);
		}
	}]);

	return Modal;
}();

exports.default = Modal;