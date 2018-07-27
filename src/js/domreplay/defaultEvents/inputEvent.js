import EventBaseClass from '../eventbaseclass';
import Logger from '../logger';


export default class InputEvent extends EventBaseClass {

	get eventType() {
		return 'input';
	}

	get tagnames() {
		return ['input', 'textarea'];
	}

	handler(element) {
			Logger.debug('Input event handler');
			const lastEvent = this.getLastStored();
			const trail = this.makeTrailForElement()
			if (lastEvent && JSON.stringify(this.makeTrailForElement(element)) === JSON.stringify(lastEvent.trail)) {
				Logger.debug('Updates last event');
				this.updateLastStored({ value: element.value });
			} else {
				this.syncStore({
					value: element.value,
					trail
				});
			}
	}

	replay(eventObject) {
		return this.trackElementOnTrail(eventObject.trail)
			.then(element => {
				this.addDomReplayBorderToElement(element);
				element.focus();
				return new promise(resolve => {
					let index = 0;
					const time = setInterval(() => {
						if (index === eventObject.value.length) {
							clearInterval(time);
							resolve(element);
						}
						element.value = element.value + eventObject.value.substring(index, index + 1);
						const inputEvent = new InputEvent('input', { bubbles: true, data: value[index], inputType: 'insertText' });
						const textInputEvent = new Event('textInput', { bubbles: true, data: value[index++] });
						element.dispatchEvent(inputEvent);
						element.dispatchEvent(textInputEvent);
					}, this.timing * 0.1);
				});
			})
			.then(element => {
				return this.executeTimingRelative(() => {
					this.removeDomReplayBorderFromElement(element);
					return element;
				}, 0.5)
			})
	}
}
