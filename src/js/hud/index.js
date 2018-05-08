import {
	dispatcher,
	domreplayIgnoreAttributeName,
	state
} from '../';


const button = (text='', classes='', id=undefined) => {
  const button = document.createElement('button');
  button.innerHTML = text;
  button.id = id;
  button.className = `dom-hud-btn ${classes}`;
  button.setAttribute(domreplayIgnoreAttributeName, '');
  return button;
}

const div = (classes='', id=undefined) => {
  const div = document.createElement('div');
  div.className = classes;
  div.id = id;
  return div;
}

export default class Hud {
  constructor(domreplay, config={}) {
  	this.config = config;
    this.domreplay = domreplay;
    this.startButton = button('Start');
    this.stopButton = button('Stop');
    this.recordButton = button('Record');
    this.loadFromStorageButton = button('Load from storage');
    this.playStepButton = button('Play step');
    this.header = div('dom-hud-header');
    this.dropDownButton = button('DOMReplay', 'dom-hud-dropDown');

    this.addEventListenerToElement(this.playStepButton, 'click', this.getPlayStepButtonEvent());
    this.addEventListenerToElement(this.startButton, 'click', this.getStartButtonEvent());
    this.addEventListenerToElement(this.loadFromStorageButton, 'click', this.getLoadFromStorageButtonEvent());
    this.addEventListenerToElement(this.recordButton, 'click', this.getRecordButtonEvent());
    this.addEventListenerToElement(this.stopButton, 'click', this.getStopButtonEvent());
    this.addEventListenerToElement(this.dropDownButton, 'click', this.getDropDownButtonEvent());
    this._initializeIndicators();
    this._initializeEventListeners();
  }

  _initializeIndicators() {
  	this.replayStateIndicator = null;
  	this.recordStateIndicator = null;
  	if (this.config.showRecordIndicator && state.stateIsRecord()) {
  		this._renderRecordStateIndicator();
  	}
  	else if (this.config.showReplayIndicator && state.stateIsReplay()) {
  		this._renderReplayStateIndicator();
  	}
  }

  _initializeEventListeners() {
  	dispatcher.addStateChangeEventListener((event) => {
  		if (state.stateIsRecord() && this.config.showRecordIndicator) {
  			this._renderRecordStateIndicator();
  		} else if (state.stateIsReplay() && this.config.showReplayIndicator) {
  			this._renderReplayStateIndicator();
  		} else {
  			this._removeRecordStateIndicator();
  			this._removeReplayStateIndicator();
  		}
  	});
  }

  getPlayStepButtonEvent() {
  	const domreplay = this.domreplay;
  	return () => {
  		domreplay.playStep();
  	}
  }

  getLoadFromStorageButtonEvent() {
  	const domreplay = this.domreplay;
  	return () => {
  		domreplay.loadEventsFromLocalStorage();
  	}
  }

  getStartButtonEvent() {
  	const domreplay = this.domreplay;
  	return () => {
  		domreplay.play();
  	}
  }

  getRecordButtonEvent() {
    const domreplay = this.domreplay;
    return () => {
      domreplay.startRecord();
    };
  }

  getStopButtonEvent() {
    const domreplay = this.domreplay
    return () => {
      domreplay.stopRecord();
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

  _renderReplayStateIndicator() {
  	this.replayStateIndicator = div('dom-state-indicator replay');
  	const text = document.createElement('h1');
  	text.innerHTML = "REPLAY";
  	this.replayStateIndicator.appendChild(text);
  	document.getElementsByTagName('body')[0].appendChild(this.replayStateIndicator);
  }

  _removeReplayStateIndicator() {
  	if (this.replayStateIndicator) {
  		this.replayStateIndicator.parentNode.removeChild(this.replayStateIndicator);
  	}
  }

  _renderRecordStateIndicator() {
  	this.recordStateIndicator = div('dom-state-indicator record');
  	const text = document.createElement('h1');
  	text.innerHTML = 'REC';
  	this.recordStateIndicator.appendChild(text);
  	document.getElementsByTagName('body')[0].appendChild(this.recordStateIndicator);
  }

  _removeRecordStateIndicator() {
  	if (this.recordStateIndicator) {
  		this.recordStateIndicator.parentNode.removeChild(this.recordStateIndicator);
  	}
  }

  render() {
    this.header.appendChild(this.startButton);
    this.header.appendChild(this.stopButton);
    this.header.appendChild(this.recordButton);
    this.header.appendChild(this.loadFromStorageButton);
    this.header.appendChild(this.playStepButton);
    let body = document.getElementsByTagName('body')[0];
    body.prepend(this.header);
    body.prepend(this.dropDownButton);
  }

}
