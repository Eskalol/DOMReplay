import {
	domreplayIgnoreAttributeName,
} from '../';

const div = (classes='', id=undefined) => {
	const div = document.createElement('div');
	div.className = classes;
	div.id = id;
	return div;
}

const input = (classes='', id=undefined) => {
	const input = document.createElement('input');
	input.type = 'text';
	input.className = classes;
	input.setAttribute(domreplayIgnoreAttributeName, '');
	return input;
}

const button = (text='', classes='', id=undefined) => {
	const button = document.createElement('button');
	button.innerHTML = text;
	button.id = id;
	button.className = `dom-hud-btn ${classes}`;
	button.setAttribute(domreplayIgnoreAttributeName, '');
	return button;
}

export default class Modal {

	constructor() {
		this.modalContainer = div('dom-modal');
		this.modalContent = div('dom-modal-content');
		this.close = document.createElement('span');
		this.close.className = 'dom-modal-close';
		this.close.setAttribute(domreplayIgnoreAttributeName, '');
		this.close.addEventListener('click', this.getCloseHandler());
		this.modalContent.appendChild(this.close);
		this.modalContainer.appendChild(this.modalContent);
	}

	getCloseHandler() {
		const modalContainer = this.modalContainer;
		return () => {
			modalContainer.parentNode.removeChild(modalContainer);
		}
	}

	createInputCopyButtonPair(text, inputValue) {
		const container = div();
		container.innerHTML = `<span>${text}</span>`;
		const urlInput = input();
		urlInput.value = inputValue;
		const copyButton = button('', 'info');
		const innerButtonSpan = document.createElement('span');
		innerButtonSpan.className = 'copy';
		innerButtonSpan.innerText = '    Copy';
		copyButton.appendChild(innerButtonSpan);
		copyButton.addEventListener('click', () => {
			urlInput.select();
			document.execCommand("copy");
		});
		container.appendChild(urlInput);
		container.appendChild(copyButton)
		return container;
	}

	handleResponse(promise) {
		const p = document.createElement('p');
		p.innerText = 'Pushing data to server...';
		this.modalContent.appendChild(p);
		promise.then(data => {
			console.log(data);
			p.parentNode.removeChild(p);
			this.modalContent.appendChild(this.createInputCopyButtonPair('Normal link:   ', data.url));
			this.modalContent.appendChild(this.createInputCopyButtonPair('Autoplay link:   ', data.autoplayUrl));
		});
	}

	getShareButtonHandler() {
		const urlInput = this.urlInput;
		return () => {
			urlInput.select();
			document.execCommand("copy");
		}
	}

	render() {
		const body = document.getElementsByTagName('body')[0];
		body.prepend(this.modalContainer);

	}
}


