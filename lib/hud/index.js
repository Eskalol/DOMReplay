'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('../');

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var div = function div() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  var div = document.createElement('div');
  div.className = classes;
  div.id = id;
  return div;
};

var inputRange = function inputRange() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var input = document.createElement('input');
  input.className = 'dom-slider ' + classes;
  input.setAttribute(_.domreplayIgnoreAttributeName, '');
  input.type = 'range';
  input.min = min;
  input.max = max;
  input.value = '' + value;
  return input;
};

var span = function span() {
  var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var span = document.createElement('span');
  span.className = classes;
  return span;
};

var Hud = function () {
  function Hud(domreplay) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Hud);

    this.config = config;
    this.domreplay = domreplay;
    this.replayButton = button('    Replay', 'play');
    this.stopButton = button('    Stop', 'stop');
    this.recordButton = button('    Record', 'record');
    this.loadFromStorageButton = button('    Load from storage', 'load');
    this.header = div('dom-hud-header');
    this.dropDownButton = button('DOMReplay', 'dom-hud-dropDown');
    this.shareButton = button('    Share', 'share');

    this.addEventListenerToElement(this.shareButton, 'click', this.getShareButtonEvent());
    this.addEventListenerToElement(this.replayButton, 'click', this.getReplayButtonEvent());
    this.addEventListenerToElement(this.loadFromStorageButton, 'click', this.getLoadFromStorageButtonEvent());
    this.addEventListenerToElement(this.recordButton, 'click', this.getRecordButtonEvent());
    this.addEventListenerToElement(this.stopButton, 'click', this.getStopButtonEvent());
    this.addEventListenerToElement(this.dropDownButton, 'click', this.getDropDownButtonEvent());
    this._initializeIndicators();
    this._initializeEventListeners();
  }

  _createClass(Hud, [{
    key: '_initializeIndicators',
    value: function _initializeIndicators() {
      this.replayStateIndicator = null;
      this.recordStateIndicator = null;
      if (this.config.showRecordIndicator && _.state.stateIsRecord()) {
        this._renderRecordStateIndicator();
      } else if (this.config.showReplayIndicator && _.state.stateIsReplay()) {
        this._renderReplayStateIndicator();
      }
    }
  }, {
    key: '_initializeEventListeners',
    value: function _initializeEventListeners() {
      var _this = this;

      _.dispatcher.addStateChangeEventListener(function (event) {
        if (_.state.stateIsRecord() && _this.config.showRecordIndicator) {
          _this._renderRecordStateIndicator();
        } else if (_.state.stateIsReplay() && _this.config.showReplayIndicator) {
          _this._renderReplayStateIndicator();
        } else {
          _this._removeRecordStateIndicator();
          _this._removeReplayStateIndicator();
        }
      });
    }
  }, {
    key: 'getShareButtonEvent',
    value: function getShareButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        var modal = new _modal2.default();
        modal.render();
        modal.handleResponse(domreplay.pushStorageToServer());
      };
    }
  }, {
    key: 'getLoadFromStorageButtonEvent',
    value: function getLoadFromStorageButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.loadEventsFromLocalStorage();
      };
    }
  }, {
    key: 'getReplayButtonEvent',
    value: function getReplayButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.play();
      };
    }
  }, {
    key: 'getRecordButtonEvent',
    value: function getRecordButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.startRecord();
      };
    }
  }, {
    key: 'getStopButtonEvent',
    value: function getStopButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.stop();
      };
    }
  }, {
    key: 'getDropDownButtonEvent',
    value: function getDropDownButtonEvent() {
      var header = this.header;
      var button = this.dropDownButton;

      return function () {
        if (header.className.indexOf('slide-down') !== -1) {
          header.className = header.className.substring(0, header.className.indexOf(' slide-down'));
          header.className += ' slide-up';
        } else {
          if (header.className.indexOf('slide-up') !== -1) {
            header.className = header.className.substring(0, header.className.indexOf(' slide-up'));
          }
          header.className += ' slide-down';
        }

        if (button.className.indexOf('slide-down') !== -1) {
          button.className = button.className.substring(0, button.className.indexOf(' slide-down'));
          button.className += ' slide-up';
        } else {
          if (button.className.indexOf('slide-up') !== -1) {
            button.className = button.className.substring(0, button.className.indexOf(' slide-up'));
          }
          button.className += ' slide-down';
        }
      };
    }
  }, {
    key: 'addEventListenerToElement',
    value: function addEventListenerToElement(element, type, event) {
      element.addEventListener(type, event);
    }
  }, {
    key: '_renderReplayStateIndicator',
    value: function _renderReplayStateIndicator() {
      this.replayStateIndicator = div('dom-state-indicator replay');
      var text = document.createElement('h1');
      text.innerHTML = "REPLAY";
      this.replayStateIndicator.appendChild(text);
      document.getElementsByTagName('body')[0].appendChild(this.replayStateIndicator);
    }
  }, {
    key: '_removeReplayStateIndicator',
    value: function _removeReplayStateIndicator() {
      if (this.replayStateIndicator) {
        this.replayStateIndicator.parentNode.removeChild(this.replayStateIndicator);
      }
    }
  }, {
    key: '_renderRecordStateIndicator',
    value: function _renderRecordStateIndicator() {
      this.recordStateIndicator = div('dom-state-indicator record');
      var text = document.createElement('h1');
      text.innerHTML = 'REC';
      this.recordStateIndicator.appendChild(text);
      document.getElementsByTagName('body')[0].appendChild(this.recordStateIndicator);
    }
  }, {
    key: '_removeRecordStateIndicator',
    value: function _removeRecordStateIndicator() {
      if (this.recordStateIndicator) {
        this.recordStateIndicator.parentNode.removeChild(this.recordStateIndicator);
      }
    }
  }, {
    key: '_getNewSlider',
    value: function _getNewSlider() {
      var _this2 = this;

      var currentReplaySpeed = this.domreplay.getCurrentReplaySpeed();
      var sliderContainer = div('dom-slidecontainer');
      var slider = inputRange('', "1", "100", '' + (currentReplaySpeed - 0.2) / 2 * 100);
      var sliderSpan = span('speed');
      slider.oninput = function () {
        sliderSpan.innerText = '  x ' + Math.round(Number(slider.value) / 50 * 100 + 20) / 100;
      };
      slider.onchange = function () {
        _this2.domreplay.setReplaySpeed(Math.round(Number(slider.value) / 50 * 100 + 20) / 100);
      };
      sliderContainer.appendChild(slider);
      sliderSpan.innerText = '  x ' + this.domreplay.getCurrentReplaySpeed();
      return [sliderContainer, sliderSpan];
    }
  }, {
    key: 'getContainer',
    value: function getContainer() {
      var classes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var container = div(classes);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var e = _step.value;

          container.appendChild(e);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return container;
    }
  }, {
    key: 'render',
    value: function render() {
      var recordReplay = this.getContainer.apply(this, ['dom-container', this.replayButton, this.stopButton, this.recordButton].concat(_toConsumableArray(this._getNewSlider())));
      var storageContainer = this.getContainer('dom-container', this.loadFromStorageButton, this.shareButton);
      this.header.appendChild(recordReplay);
      this.header.appendChild(storageContainer);
      var body = document.getElementsByTagName('body')[0];
      body.prepend(this.header);
      body.prepend(this.dropDownButton);
    }
  }]);

  return Hud;
}();

exports.default = Hud;