jest.dontMock("fs");

import fs from 'fs';

import { Storage, handlers } from '../../src/js';
import { domloader } from '../../src/js/domreplay/loader';
import { setStateReady, setStateRecord } from '../../src/js/domreplay/state';
import { tracker } from '../../src/js/domreplay/domhound';

const doc = fs.readFileSync('./test/domreplay/storage-fixture.html');

function customTrail(element) {
	return element.id;
}

describe('Storage', () => {

	describe('Stored correctly', () => {
		beforeAll(() => {
			document.documentElement.innerHTML = doc;
			return domloader([{
				type: 'click',
				tagnames: ['a', 'button'],
				handler: handlers.handleClickEvent
			}, {
				type: 'input',
				tagnames: ['input', 'select', 'textarea'],
				handler: handlers.handleInputEvent
			}, {
				type: 'change',
				tagnames: ['input', 'select', 'textarea'],
				handler: handlers.handleChangeEvent
			}], test=true);
		});

		it('should store button correctly', async () => {
			await setStateReady();
			await setStateRecord();
			const button = document.getElementsByTagName('button')[0];
			button.click();
			const eventList = Storage.eventList;
			expect(eventList.count).toEqual(1);
			expect(eventList.eventList.length).toBe(1);
			expect(tracker(eventList.eventList[0].trail)).resolves.toEqual(button);
		});

		it('should store second button correctly', () => {
			const button = document.getElementsByTagName('button')[1];
			button.click();
			const eventList = Storage.eventList;
			expect(eventList.count).toEqual(2);
			expect(eventList.eventList.length).toBe(2);
			expect(tracker(eventList.eventList[1].trail)).resolves.toEqual(button);
		});
	});

	describe('Custom trail in store', () => {
		beforeAll(() => {
			localStorage.clear();
			document.documentElement.innerHTML = doc;
			Storage.setTrailFunction(customTrail);
			return domloader([{
				type: 'click',
				tagnames: ['a', 'button'],
				handler: handlers.handleClickEvent
			}, {
				type: 'input',
				tagnames: ['input', 'select', 'textarea'],
				handler: handlers.handleInputEvent
			}, {
				type: 'change',
				tagnames: ['input', 'select', 'textarea'],
				handler: handlers.handleChangeEvent
			}], test=true);
		});

		it('custom trail should be cool', async () => {
			await setStateReady();
			await setStateRecord();
			const button = document.getElementsByTagName('button')[2];
			button.click();
			const eventList = Storage.eventList;
			expect(eventList.count).toEqual(1);
			expect(eventList.eventList.length).toBe(1);
			expect(eventList.eventList[0].trail).toEqual('cool');
		});

		it('custom trail should be imba', () => {
			const button = document.getElementsByTagName('button')[3];
			button.click();
			const eventList = Storage.eventList;
			expect(eventList.count).toEqual(2);
			expect(eventList.eventList.length).toBe(2);
			expect(eventList.eventList[1].trail).toEqual('imba');
		});
	});
});
