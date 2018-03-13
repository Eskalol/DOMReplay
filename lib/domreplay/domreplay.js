'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

var _handlers = require('./handlers');

var _handlers2 = _interopRequireDefault(_handlers);

var _replay = require('./replay');

var _replay2 = _interopRequireDefault(_replay);

var _serverstorage = require('./serverstorage');

var _serverstorage2 = _interopRequireDefault(_serverstorage);

var _dom_loader = require('./dom_loader');

var _dom_loader2 = _interopRequireDefault(_dom_loader);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _state = require('./state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomReplay = function () {
  function DomReplay() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DomReplay);

    this.config = config;
    if (this.config.debugmode) {
      _logger2.default.logging = true;
    }

    this.util = new _utils2.default(config.debugmode);

    this.PASSIVE_STATE = 0;
    this.RECORD_STATE = 1;
    this.REPLAY_STATE = 2;
    this.storage = new _storage2.default(this);
    this.handler = new _handlers2.default(this);
    this.replay = new _replay2.default(this);
    this.domLoader = new _dom_loader2.default(this);

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
    }).then(function (state) {
      return _logger2.default.debug('current State is: ' + state);
    });
  }

  _createClass(DomReplay, [{
    key: 'setOperatingStateReplay',
    value: function setOperatingStateReplay() {
      this.currentOperatingState = this.REPLAY_STATE;
    }
  }, {
    key: 'setOperatingStateRecord',
    value: function setOperatingStateRecord() {
      this.currentOperatingState = this.RECORD_STATE;
    }
  }, {
    key: 'setOperatingStatePassive',
    value: function setOperatingStatePassive() {
      if (this.currentOperatingState === this.RECORD_STATE) {
        this.util.debug('Stopped recording, should store to server now!');
      }
      this.currentOperatingState = this.PASSIVE_STATE;
    }
  }, {
    key: 'operatingSTateIsRecording',
    value: function operatingSTateIsRecording() {
      return this.currentOperatingState === this.RECORD_STATE;
    }
  }, {
    key: 'operatingStateIsReplaying',
    value: function operatingStateIsReplaying() {
      return this.currentOperatingState === this.REPLAY_STATE;
    }
  }, {
    key: 'operatingStateIsPassive',
    value: function operatingStateIsPassive() {
      return this.currentOperatingState === this.PASSIVE_STATE;
    }
  }, {
    key: 'startTracking',
    value: function startTracking() {
      this.initializeTracking().then(function () {
        console.log('success');
      }).catch(function (_ref) {
        var message = _ref.message;

        console.log('message');
      });
    }
  }, {
    key: 'initializeTracking',
    value: function initializeTracking() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.operatingSTateIsRecording()) {
          _this.util.debug('cancelling initialization of recording due to recording already being in progress.');
          reject({ message: 'cancelling initialization of recording due to recording already being in progress.' });
        }

        var time = setInterval(function () {
          _this.util.debug('running readyState-check');
          if (document.readyState !== 'complete') {
            _this.util.debug('document not yet ready - postponing initialization');
            return;
          }
          clearInterval(time);
          resolve(_this.initializeModules());
        }, 100);
      });
    }
  }, {
    key: 'initializeModules',
    value: function initializeModules() {
      this.util.debug('running initialize_modules');
      this.domLoader.initializeEvents();
      this.domLoader.initializeMutationObserver();
      this.util.debug('all modules initialized');
      this.setOperatingStateRecord();
    }
  }, {
    key: 'getPlaybackObject',
    value: function getPlaybackObject() {
      return this.replay;
    }
  }, {
    key: 'pushToServer',
    value: function pushToServer() {
      if (!this.config.server) {
        this.util.debug('Cannot push to server without server configuration!');
        return;
      }
      this.serverstorage.pushToServer();
    }
  }, {
    key: 'loadFromServer',
    value: function loadFromServer() {
      if (!this.config.server) {
        this.util.debug('Cannot load to server without server configuration!');
        return;
      }
      this.serverstorage.loadFromServer();
    }
  }, {
    key: 'resetStorage',
    value: function resetStorage() {
      this.storage.reset();
    }
  }]);

  return DomReplay;
}();

exports.default = DomReplay;