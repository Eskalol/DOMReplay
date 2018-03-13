'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServerStorage = function () {
  function ServerStorage(main) {
    _classCallCheck(this, ServerStorage);

    this.main = main;
    this.util = this.main.util;
    this.conf = this.main.config.server;
    this.loadFromServer();
  }

  _createClass(ServerStorage, [{
    key: 'readyToLoad',
    value: function readyToLoad() {
      if (!this.conf.url) {
        this.debug('Cannot make call to server without url!');
        return false;
      }
      if (!this.main.operatingStateIsPassive()) {
        this.debug('Cannot make a call to server while state is not passive!');
        return false;
      }
      return !this.conf.isLoading;
    }
  }, {
    key: 'loadFromServer',
    value: function loadFromServer() {
      var _this = this;

      if (!this.readyToLoad()) {
        return;
      }
      this.conf.isLoading = true;

      var urlstring = this.conf.url + '?session_id=' + this.conf.sessionId;
      if (!this.conf.userId) {
        urlstring = urlstring + '&user_id=' + this.conf.userId;
      }
      this.util.debug('Attempting to load from url: ' + urlstring);
      this.util.debug('conf.user_id: ' + this.conf.user_id + ', conf.session_id: ' + this.conf.session_id + ', conf.url: ' + this.conf.url);
      this.util.debug('conf:');
      this.util.debugLiteral(this.conf);
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var config = {
        method: 'GET',
        headers: headers
      };
      fetch(new Request(urlstring), config).then(function (response) {
        _this.util.debug(response);
        if (response.status === 200) {
          _this.main.storage.updateStorage(response.data);
        }
        _this.isLoading = false;
      }).catch(function (error) {
        _this.util.debug(error);
      });
    }
  }, {
    key: 'pushToServer',
    value: function pushToServer() {
      var _this2 = this;

      if (!this.readyToLoad()) {
        return;
      }
      this.conf.isLoading = true;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Origin', '' + this.conf.url);
      var config = {
        method: 'POST',
        headers: headers
      };
      var data = {
        user_id: this.conf.userId,
        session_id: this.conf.session_id,
        data: this.main.storage.data
      };
      fetch(new Request(this.conf.url), config).then(function (response) {
        _this2.isLoading = false;
      }).catch(function (error) {});
    }
  }]);

  return ServerStorage;
}();

exports.default = ServerStorage;