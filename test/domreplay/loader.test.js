jest.dontMock("fs");


import fs from 'fs';
import * as loader from '../../src/js/domreplay/loader';
const doc = fs.readFileSync('./test/domreplay/domloader-fixture.html').toString();


describe('domloader', () => {
	const clickHandler = jest.fn();
	const inputHandler = jest.fn();
	const changeHandler = jest.fn();

	beforeAll(() => {
		document.documentElement.innerHTML = doc;
		const events = [{
			type: 'click',
			tagnames: ['a', 'button'],
			handler: clickHandler
		}, {
			type: 'input',
			tagnames: ['input', 'select', 'textarea'],
			handler: inputHandler
		}, {
			type: 'change',
			tagnames: ['input', 'select', 'textarea']
		}];
		return loader.domloader(events, test=true);
	});

	it('should execute handler function when button clicked', () => {
		const button = document.getElementsByTagName('button')[0];
		button.click();
		expect(clickHandler).toHaveBeenCalledTimes(1);
		expect(clickHandler).toHaveBeenCalledWith(button);
	});

	it('should execute input event on first input element', () => {
		const input = document.getElementsByTagName('input')[0];
		let event = new Event('input');
		input.dispatchEvent(event);
		expect(inputHandler).toHaveBeenCalledTimes(1);
		expect(inputHandler).toHaveBeenCalledWith(input);
	});

	it('should execute input event on second input element', () => {
		const input = document.getElementsByTagName('input')[1];
		let event = new Event('input');
		input.dispatchEvent(event);
		expect(inputHandler).toHaveBeenCalledTimes(2);
		expect(inputHandler).toHaveBeenCalledWith(input);
	});

	it('should execute input event on textarea', () => {
		const textarea = document.getElementsByTagName('textarea')[0];
		let event = new Event('input');
		textarea.dispatchEvent(event);
		expect(inputHandler).toHaveBeenCalledTimes(3);
		expect(inputHandler).toHaveBeenCalledWith(textarea);
	});
});
