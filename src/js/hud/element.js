class Element extends HTMLElement {
	constructor(id=undefined, classes='') {
		super();
	}	
}

export class Button extends HTMLButtonElement {
	constructor(text='', classes='', id=undefined, onClick=undefined) {
		super();
		this.innerHTML = text;
		this.id = id;
		this.onClick = onClick;
		this.className = `dom-hud-btn ${classes}`;
	}
}
