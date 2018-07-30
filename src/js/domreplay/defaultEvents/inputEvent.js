import EventBaseClass from '../eventbaseclass';
import Logger from '../logger';

/**
 * Basic Input Event.
 */
export default class CustomInputEvent extends EventBaseClass {

	get eventType() {
		return 'input';
	}

	get tagnames() {
		return ['input', 'textarea'];
	}

	handler(element) {
			Logger.debug('Input event handler');
			const lastEvent = this.getLastStored();
			const trail = this.makeTrailForElement(element)
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
		const { value } = eventObject;
		return this.trackElementOnTrail(eventObject.trail)
			.then(element => {
				this.addDomReplayBorderToElement(element);
				element.focus();
				return new Promise(resolve => {
					let index = 0;
					const time = setInterval(() => {
						if (index === eventObject.value.length) {
							clearInterval(time);
							return resolve(element);
						}
						element.value = value.substring(0, index + 1);
						const inputEvent = new InputEvent('input', { bubbles: true, data: value[index], inputType: 'insertText' });
						const textInputEvent = new Event('textInput', { bubbles: true, data: value[index] });
						element.dispatchEvent(inputEvent);
						element.dispatchEvent(textInputEvent);
						index++;
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
