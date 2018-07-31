import {
	dispatcher,
	domreplayIgnoreAttributeName,
	state
} from '../';
import Modal from './modal';


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

const inputRange = (classes='', min=0.1, max=2, value=1) => {
	const input = document.createElement('input');
	input.className = `dom-slider ${classes}`;
	input.setAttribute(domreplayIgnoreAttributeName, '');
	input.type = 'range';
	input.min = min;
	input.max = max;
	input.value = `${value}`;
	return input;
}

const span = (classes='') => {
	const span = document.createElement('span');
	span.className = classes;
	return span;
}

export default class Hud {
  constructor(domreplay, config={}) {
  	this.config = config;
    this.domreplay = domreplay;
    this.replayButton = button('    Replay', 'play');
    this.stopButton = button('    Stop', 'stop');
    this.recordButton = button('    Record', 'record');
    this.loadFromStorageButton = button('    Load from storage', 'load');
    this.header = div('dom-hud-header');
    this.dropDownButton = button('DOMReplay', 'dom-hud-dropDown');
		this.shareButton = button('    Share', 'share');

		this.addEventListenerToElement(this.shareButton, 'click', this.getShareButtonEvent());
    this.addEventListenerToElement(this.replayButton, 'click', this.getReplayButtonEvent());
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

  getShareButtonEvent() {
  	const domreplay = this.domreplay;
  	return () => {
			const modal = new Modal();
			modal.render();
			modal.handleResponse(domreplay.pushStorageToServer());
		}
	}

  getLoadFromStorageButtonEvent() {
  	const domreplay = this.domreplay;
  	return () => {
  		domreplay.loadEventsFromLocalStorage();
  	}
  }

  getReplayButtonEvent() {
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
      domreplay.stop();
    }
  }

  getDropDownButtonEvent() {
    const header = this.header;
    const button = this.dropDownButton;

    return () => {
      if (header.className.indexOf('slide-down') !== -1) {
        header.className = header.className.substring(0, header.className.indexOf(' slide-down'));
        header.className += ' slide-up';
      } else {
        if (header.className.indexOf('slide-up') !== -1) {
          header.className = header.className.substring(0, header.className.indexOf(' slide-up'));
        }
        header.className += ' slide-down';
      }

      if (button.className.indexOf('slide-down') !== -1) {
        button.className = button.className.substring(0, button.className.indexOf(' slide-down'));
        button.className += ' slide-up';
      } else {
        if (button.className.indexOf('slide-up') !== -1) {
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

  _getNewSlider() {
  	const currentReplaySpeed = this.domreplay.getCurrentReplaySpeed();
  	const sliderContainer = div('dom-slidecontainer');
  	const slider = inputRange('', "1", "100", `${(currentReplaySpeed-0.2)/2*100}`);
  	const sliderSpan = span('speed');
		slider.oninput = () => {
  		sliderSpan.innerText = `  x ${Math.round((Number(slider.value)/50*100)+20)/100}`;
		}
		slider.onchange = () => {
			this.domreplay.setReplaySpeed(Math.round((Number(slider.value)/50*100)+20)/100);
		}
  	sliderContainer.appendChild(slider);
  	sliderSpan.innerText = `  x ${this.domreplay.getCurrentReplaySpeed()}`;
  	return [sliderContainer, sliderSpan];
	}

	getContainer(classes='', ...args) {
  	const container = div(classes);
  	for (let e of args) {
			container.appendChild(e);
		}
		return container;
	}

  render() {
  	const recordReplay = this.getContainer('dom-container',
			this.replayButton,
			this.stopButton,
			this.recordButton,
			...this._getNewSlider());
  	const storageContainer = this.getContainer('dom-container',
			this.loadFromStorageButton,
			this.shareButton);
  	this.header.appendChild(recordReplay);
    this.header.appendChild(storageContainer);
    let body = document.getElementsByTagName('body')[0];
    body.prepend(this.header);
    body.prepend(this.dropDownButton);
  }
}
