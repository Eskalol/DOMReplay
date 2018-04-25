

export default class BaseButton extends HTMLButtonElement {

	constructor(domreplay) {
		super();
		this.domreplay = domreplay;
		this.addEventListener('click', this.handleOnClickEvent);
		this.innerHTML = this.text;
		this.id = this.id;
		this.classNames = this.classNames.join(' ');
	}

	get classNames() {
		return [
			'dom-hud-btn'
		];
	}

	get id() {
		return undefined;
	}

	get text() {
		return '';
	}

	handleOnClickEvent() {

	}
}
