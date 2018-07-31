'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UrlParser = function () {
	function UrlParser() {
		_classCallCheck(this, UrlParser);
	}

	_createClass(UrlParser, [{
		key: 'buildUrl',
		value: function buildUrl(id) {
			var autoplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			return window.location.origin + '?replayjs_id=' + id + (autoplay ? '&replayjs_autoplay=true' : '');
		}
	}, {
		key: 'autoplay',
		value: function autoplay() {
			var auto = new URLSearchParams(document.location.search).get('replayjs_autoplay');
			console.log(auto);
			return !!auto && auto === 'true';
		}
	}, {
		key: 'containsId',
		value: function containsId() {
			return !!new URLSearchParams(document.location.search).get('replayjs_id');
		}
	}, {
		key: 'getId',
		value: function getId() {
			console.log(new URLSearchParams(document.location.search).get('replayjs_id'));
			return new URLSearchParams(document.location.search).get('replayjs_id');
		}
	}]);

	return UrlParser;
}();

exports.default = UrlParser;