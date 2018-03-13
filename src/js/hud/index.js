
const button = (text='', classes='', id=undefined) => {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.id = id;
  button.className = `dom-hud-btn ${classes}`;
  return button;
}

const div = (classes='', id=undefined) => {
  const div = document.createElement('div');
  div.className = classes;
  div.id = id;
  return div;
}

export default class Hud {
  constructor(domreplay) {
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

  getRecordButtonEvent() {
    const domreplay = this.domreplay;
    return () => {
      domreplay.startTracking();
    };
  }

  getStopButtonEvent() {
    const domreplay = this.domreplay
    return () => {
      domreplay.setOperatingStatePassive();
    }
  }

  getDropDownButtonEvent() {
    const header = this.header;
    const button = this.dropDownButton;

    return () => {
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

  addEventListenerToElement(element, type, event) {
    element.addEventListener(type, event);
  }

  render() {
    this.header.appendChild(this.startButton);
    this.header.appendChild(this.stopButton);
    this.header.appendChild(this.recordButton);
    let body = document.getElementsByTagName('body')[0];
    body.prepend(this.header);
    body.prepend(this.dropDownButton);
  }

}
