import { PlayButton } from '../buttons';


export class ReplayContainer extends HTMLDivElement {

	constructor(domreplay) {
		super();
		this.domreplay = domreplay;
	}

	get content() {
		return [
			new PlayButton,
		]
	}

	addContent() {
		for (let element of this.content) {
			this.appendChild(new element(this.domreplay));
		}
	}


}
