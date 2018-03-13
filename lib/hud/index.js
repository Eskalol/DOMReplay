'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var button = function button() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

  var button = document.createElement('button');
  button.innerHTML = text;
  button.id = id;
  button.className = 'dom-hud-btn ' + classes;
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
    _classCallCheck(this, Hud);

    if (domreplay.config.debugmode) {
      console.log('[HUD] DOMReplay - Initializing Hud');
    }

    this.domreplay = domreplay;
    this.startButton = button('Start');
    this.stopButton = button('Stop');
    this.recordButton = button('Record');
    this.header = div('dom-hud-header');
    this.dropDownButton = button('DOMReplay', 'dom-hud-dropDown');

    this.addEventListenerToElement(this.recordButton, 'click', this.getRecordButtonEvent());
    this.addEventListenerToElement(this.stopButton, 'click', this.getStopButtonEvent());
    this.addEventListenerToElement(this.dropDownButton, 'click', this.getDropDownButtonEvent());
  }

  _createClass(Hud, [{
    key: 'getRecordButtonEvent',
    value: function getRecordButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.startTracking();
      };
    }
  }, {
    key: 'getStopButtonEvent',
    value: function getStopButtonEvent() {
      var domreplay = this.domreplay;
      return function () {
        domreplay.setOperatingStatePassive();
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
    key: 'render',
    value: function render() {
      this.header.appendChild(this.startButton);
      this.header.appendChild(this.stopButton);
      this.header.appendChild(this.recordButton);
      var body = document.getElementsByTagName('body')[0];
      body.prepend(this.header);
      body.prepend(this.dropDownButton);
    }
  }]);

  return Hud;
}();

exports.default = Hud;