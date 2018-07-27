import EventBaseClass from '../eventbaseclass';


export default class ClickEvent extends EventBaseClass {
	get eventType() {
		return 'click';
	}

	get tagnames() {
		return ['button', 'a'];
	}

	handler(element) {
		const trail = this._makeTrailForElement(element);
		this._syncStore({ trail });
	}

	replay(eventObject) {
		return this._trackElementOnTrail(eventObject.trail)
			.then(element => {
				this._addDomReplayBorderToElement(element);
				return this._executeTimingRelative(() => {
					element.click();
					this._removeDomReplayBorderFromElement(element);
					return element;
				});
			})
			.then(() => {
				return this._executeTimingRelative(() => {}, 1);
			});
	}
}
