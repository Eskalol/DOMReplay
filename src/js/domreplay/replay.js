export default class Replay {
  constructor(main) {
    this.main = main;
    this.util = main.util;
    this.STATE_STOPPED = 0;
    this.STATE_PLAY = 1;

    this.currentStep = 0;
    this.defaultDelay = 500;

    this.currentState = this.STATE_STOPPED;
  }

  play() {
    if (this.main.operatingStateIsReplaying()) {
      this.util.debug('replay initialization cancelled due to replay already running');
      return;
    }
    this.main.setOperatingStateReplay();
    const playStep = () => {
      if (this.currentState !== this.STATE_PLAY) {
        return;
      }

      const storedElement = this.main.storage.data[this.currentState];
      this.util.debug(`replaying! Attempting to execute a ${storedElement.event_type} on ${storedElement.id}`);
      const element = document.getElementById(storedElement.id);
      const event = new Event(storedElement.event_type);
      element.dispatchEvent(event);

      if (storedElement.value !== undefined) {
        element.value = storedElement.value;
      }

      this.currentStep = this.currentStep + 1;
      this.util.debug(`current_step is now ${this.current_step}`);

      if (this.main.config.events[storedElement.event_type].delay !== undefined) {
        triggerNextStep(this.main.config.events[storedElement.event_type].delay);
      } else {
        triggerNextStep();
      }
    };
    const triggerNextStep = (delay = this.defaultDelay) => {
      this.util.debug('attempting to trigger next step');
      if (this.currentStep >= this.main.storage.data.length) {
        this.main.setOperatingStatePassive();
        return;
      }
      this.util.debug(`storage.length (${this.main.storage.data.length}) >= current_step (${this.current_step})`);
      window.setTimeout(playStep, delay);
    };
    this.util.debug('setting current state to play, and running next step!');
    this.currentState = this.STATE_PLAY;
    triggerNextStep();
  }

  pause() {
    this.util.debug('pausing...');
    this.main.setOperatingStatePassive();
    this.currentState = this.STATE_STOPPED;
  }

  reset() {
    this.uitl.debug('stopping playback and resetting counter!');
    this.main.setOperatingStatePassive();
    this.currentState = this.STATE_STOPPED;
    this.currentState = 0;
  }
}
