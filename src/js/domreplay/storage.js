export default class Storage {
  constructor(main) {
    this.main = main;
    this.util = main.util;
    this.data = [];
    this.isInitialized = true;
  }

  reset() {
    this.data = [];
  }

  okToStoreEvent(element) {
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

  addEvent(element, event, addValue = false) {
    this.util.debug('adding event to storage');
    if (!this.okToStoreEvent(element)) {
      return;
    }
    const object = {
      eventType: event,
      id: element.id,
    };
    if (addValue) {
      object.value = element.value;
    }
    this.data.push(object);
  }

  updateStorage(newData) {
    this.util.debug('updating storage.data.');
    this.util.debug('new data:');
    this.util.debugLiteral(newData);
    this.data = newData;
  }
}
