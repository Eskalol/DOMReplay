'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('../');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var button = function button() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  var button = document.createElement('button');
  button.innerHTML = text;
  button.id = id;
  button.className = _.domreplayIgnoreClassName + ' dom-hud-btn ' + classes;
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

var Hud = function () {
  function Hud(domreplay) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Hud);

    this.config = config;
    this.domreplay = domreplay;
    this.startButton = button('Start');
    this.stopButton = button('Stop');
    this.recordButton = button('Record');
    this.loadFromStorageButton = button('Load from storage');
    this.playStepButton = button('Play step');
    this.header = div('dom-hud-header');
    this.dropDownButton = button('DOMReplay', 'dom-hud-dropDown');

    this.addEventListenerToElement(this.playStepButton, 'click', this.getPlayStepButtonEvent());
    this.addEventListenerToElement(this.startButton, 'click', this.getStartButtonEvent());
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
    key: 'getPlayStepButtonEvent',
    value: function getPlayStepButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.playStep();
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
    key: 'getStartButtonEvent',
    value: function getStartButtonEvent() {
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
        domreplay.stopRecord();
      };
    }
  }, {
    key: 'getDropDownButtonEvent',
    value: function getDropDownButtonEvent() {
      var header = this.header;
      var button = this.dropDownButton;

      return function () {
        if (header.className.indexOf('slide-down') != -1) {
          header.className = header.className.substring(0, header.className.indexOf(' slide-down'));
          header.className += ' slide-up';
        } else {
          if (header.className.indexOf('slide-up') != -1) {
            header.className = header.className.substring(0, header.className.indexOf(' slide-up'));
          }
          header.className += ' slide-down';
        }

        if (button.className.indexOf('slide-down') != -1) {
          button.className = button.className.substring(0, button.className.indexOf(' slide-down'));
          button.className += ' slide-up';
        } else {
          if (button.className.indexOf('slide-up') != -1) {
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
    key: 'render',
    value: function render() {
      this.header.appendChild(this.startButton);
      this.header.appendChild(this.stopButton);
      this.header.appendChild(this.recordButton);
      this.header.appendChild(this.loadFromStorageButton);
      this.header.appendChild(this.playStepButton);
      var body = document.getElementsByTagName('body')[0];
      body.prepend(this.header);
      body.prepend(this.dropDownButton);
    }
  }]);

  return Hud;
}();

exports.default = Hud;