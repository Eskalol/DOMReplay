'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Storage = function () {
  function Storage(main) {
    _classCallCheck(this, Storage);

    this.main = main;
    this.util = main.util;
    this.data = [];
    this.isInitialized = true;
    this.util.debug('Initializing Storage');
  }

  _createClass(Storage, [{
    key: 'reset',
    value: function reset() {
      this.data = [];
    }
  }, {
    key: 'okToStoreEvent',
    value: function okToStoreEvent(element) {
      if (!this.isInitialized) {
        this.util.error('attempting to add element before storage was initialized!');
        return false;
      }
      if (!this.main.operatingStateIsRecording()) {
        this.util.debug('cancelling storage due to current operating state not set to record');
        return false;
      }
      if (element.hasAttribute('DomReplayIgnore')) {
        this.util.error('Cannot track ignored element');
        return false;
      }
      if (!element || !element.id) {
        this.util.error('Cannot add element to storage without valid id!');
        return false;
      }
      return true;
    }
  }, {
    key: 'addEvent',
    value: function addEvent(element, event) {
      var addValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.util.debug('adding event to storage');
      if (!this.okToStoreEvent(element)) {
        return;
      }
      var object = {
        eventType: event,
        id: element.id
      };
      if (addValue) {
        object.value = element.value;
      }
      this.data.push(object);
    }
  }, {
    key: 'updateStorage',
    value: function updateStorage(newData) {
      this.util.debug('updating storage.data.');
      this.util.debug('new data:');
      this.util.debugLiteral(newData);
      this.data = newData;
    }
  }]);

  return Storage;
}();

exports.default = Storage;