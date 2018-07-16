jest.dontMock("fs");

import fs from 'fs';
import * as loader from '../../src/js/domreplay/loader';
import EventBaseClass from '../../src/js/domreplay/eventbaseclass';
import RegistrySingleton from '../../src/js/domreplay/registry';

const doc = fs.readFileSync('./test/domreplay/domloader-fixture.html').toString();


jest.mock('../../src/js/domreplay/state', () => ({
	stateIsRecord: () => true
}));

class ClickEvent extends EventBaseClass {
	handler = jest.fn();

	get tagnames () {
		return ['a', 'button'];
	}

	get eventType () {
		return 'click';
	}
}


class InputEvent extends EventBaseClass {
	handler = jest.fn();

	get tagnames () {
		return ['input', 'select', 'textarea'];
	}

	get eventType() {
		return 'input';
	}
}


describe('domloader', () => {
	beforeAll(() => {
		document.documentElement.innerHTML = doc;
		RegistrySingleton.registerEvent(new ClickEvent());
		RegistrySingleton.registerEvent(new InputEvent());
		return loader.domloader(test=true);
	});

	it('should execute handler function when button clicked', () => {
		const button = document.getElementsByTagName('button')[0];
		button.click();
		const clickEvent = RegistrySingleton.getEvent('click');
		expect(clickEvent.handler).toHaveBeenCalledTimes(1);
		expect(clickEvent.handler).toHaveBeenCalledWith(button);
	});

	it('should execute input event on first input element', () => {
		const input = document.getElementsByTagName('input')[0];
		let event = new Event('input');
		input.dispatchEvent(event);
		const inputEvent = RegistrySingleton.getEvent('input');
		expect(inputEvent.handler).toHaveBeenCalledTimes(1);
		expect(inputEvent.handler).toHaveBeenCalledWith(input);
	});

	it('should execute input event on second input element', () => {
		const input = document.getElementsByTagName('input')[1];
		let event = new Event('input');
		input.dispatchEvent(event);
		const inputEvent = RegistrySingleton.getEvent('input');
		expect(inputEvent.handler).toHaveBeenCalledTimes(2);
		expect(inputEvent.handler).toHaveBeenCalledWith(input);
	});

	it('should execute input event on textarea', () => {
		const textarea = document.getElementsByTagName('textarea')[0];
		let event = new Event('input');
		textarea.dispatchEvent(event);
		const inputEvent = RegistrySingleton.getEvent('input');
		expect(inputEvent.handler).toHaveBeenCalledTimes(3);
		expect(inputEvent.handler).toHaveBeenCalledWith(textarea);
	});
});
