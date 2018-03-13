'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Replay = function () {
  function Replay(main) {
    _classCallCheck(this, Replay);

    this.main = main;
    this.util = main.util;
    this.STATE_STOPPED = 0;
    this.STATE_PLAY = 1;

    this.currentStep = 0;
    this.defaultDelay = 500;

    this.currentState = this.STATE_STOPPED;
  }

  _createClass(Replay, [{
    key: 'play',
    value: function play() {
      var _this = this;

      if (this.main.operatingStateIsReplaying()) {
        this.util.debug('replay initialization cancelled due to replay already running');
        return;
      }
      this.main.setOperatingStateReplay();
      var playStep = function playStep() {
        if (_this.currentState !== _this.STATE_PLAY) {
          return;
        }

        var storedElement = _this.main.storage.data[_this.currentState];
        _this.util.debug('replaying! Attempting to execute a ' + storedElement.event_type + ' on ' + storedElement.id);
        var element = document.getElementById(storedElement.id);
        var event = new Event(storedElement.event_type);
        element.dispatchEvent(event);

        if (storedElement.value !== undefined) {
          element.value = storedElement.value;
        }

        _this.currentStep = _this.currentStep + 1;
        _this.util.debug('current_step is now ' + _this.current_step);

        if (_this.main.config.events[storedElement.event_type].delay !== undefined) {
          triggerNextStep(_this.main.config.events[storedElement.event_type].delay);
        } else {
          triggerNextStep();
        }
      };
      var triggerNextStep = function triggerNextStep() {
        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.defaultDelay;

        _this.util.debug('attempting to trigger next step');
        if (_this.currentStep >= _this.main.storage.data.length) {
          _this.main.setOperatingStatePassive();
          return;
        }
        _this.util.debug('storage.length (' + _this.main.storage.data.length + ') >= current_step (' + _this.current_step + ')');
        window.setTimeout(playStep, delay);
      };
      this.util.debug('setting current state to play, and running next step!');
      this.currentState = this.STATE_PLAY;
      triggerNextStep();
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.util.debug('pausing...');
      this.main.setOperatingStatePassive();
      this.currentState = this.STATE_STOPPED;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.uitl.debug('stopping playback and resetting counter!');
      this.main.setOperatingStatePassive();
      this.currentState = this.STATE_STOPPED;
      this.currentState = 0;
    }
  }]);

  return Replay;
}();

exports.default = Replay;