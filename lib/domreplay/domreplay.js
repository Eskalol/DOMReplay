'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _handlers = require('./handlers');

var _replay = require('./replay');

var _replay2 = _interopRequireDefault(_replay);

var _serverstorage = require('./serverstorage');

var _serverstorage2 = _interopRequireDefault(_serverstorage);

var _dom_loader = require('./dom_loader');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _error = require('./error');

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomReplay = function () {
  /**
   * The core DomReplay class
   * @param  {Boolean}  config.debugmode - if true, debug messages wil be logged.
   * @return {DomReplay} an instance of DomReplay
   */
  function DomReplay() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DomReplay);

    this.config = config;
    if (config.debugmode) {
      _logger2.default.logging = true;
    }
    this.replay = new _replay2.default();

    if (!config.events) {
      this.config.events = [{
        type: 'click',
        tagnames: ['a', 'button'],
        handler: _handlers.handleClickEvent
      }, {
        type: 'input',
        tagnames: ['input', 'select', 'textarea'],
        handler: _handlers.handleInputEvent
      }];
    }

    if (this.config.server) {
      this.serverstorage = new _serverstorage2.default(this);
    }

    (0, _dom_loader.domloader)(this.config.events).then(function () {
      return (0, _state.setStateReady)();
    }).catch(function (err) {
      if (err.type === _error.STATE_ERROR) {
        if ((0, _state.stateIsReplay)()) {
          return _this.playSteps();
        }
        return;
      }
      throw err;
    });
  }

  _createClass(DomReplay, [{
    key: 'startRecord',
    value: function startRecord() {
      (0, _state.setStateRecord)().catch(function (err) {
        if (err === _error.STATE_ERROR) {
          _logger2.default.warning(err.message);
        } else {
          throw err;
        }
      });
    }
  }, {
    key: 'stopRecord',
    value: function stopRecord() {
      (0, _state.setStateReady)(true).catch(function (err) {
        if (err === _error.STATE_ERROR) {
          _logger2.default.warning(err.message);
        } else {
          throw err;
        }
      });
    }
  }, {
    key: 'loadEventsFromLocalStorage',
    value: function loadEventsFromLocalStorage() {
      this.replay.load(_storage2.default.eventList);
    }
  }, {
    key: 'play',
    value: function play() {
      this.replay.reset();
      this.replay.play().then(function (status) {
        _logger2.default.debug('replayed ' + status.replayedEvents + ' of ' + status.totalEventCount + ' events.');
        (0, _state.setStateReady)(true);
      });
    }
  }]);

  return DomReplay;
}();

exports.default = DomReplay;