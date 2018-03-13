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
  function DomReplay() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DomReplay);

    this.config = config;
    if (config.debugmode) {
      _logger2.default.logging = true;
    }

    this.util = new _utils2.default(config.debugmode);
    this.storage = new _storage2.default(this);
    this.replay = new _replay2.default(this);

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