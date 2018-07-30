import EventBaseClass from '../eventbaseclass';

/**
 * Basic Click Event.
 */
export default class ClickEvent extends EventBaseClass {
	get eventType() {
		return 'click';
	}

	get tagnames() {
		return ['button', 'a'];
	}

	handler(element) {
		const trail = this.makeTrailForElement(element);
		this.syncStore({ trail });
	}

	replay(eventObject) {
		return this.trackElementOnTrail(eventObject.trail)
			.then(element => {
				this.addDomReplayBorderToElement(element);
				return this.executeTimingRelative(() => {
					element.click();
					this.removeDomReplayBorderFromElement(element);
					return element;
				});
			})
			.then(() => {
				return this.executeTimingRelative(() => {});
			});
	}
}
