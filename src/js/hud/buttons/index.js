import BaseButton from './base';


class PlayButton extends BaseButton {

		get text() {
			return 'play';
		}

		handleOnClickEvent() {
			this.domreplay.play();
		}
}


