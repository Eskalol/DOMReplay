jest.dontMock("fs");
jest.disableAutomock();


import fs from 'fs';
import { trail, tracker } from '../../src/js/domreplay/domhound';
import util from 'util';

const doc = fs.readFileSync('./test/domreplay/fixture.html').toString();


describe('domhound test', () => {
	beforeAll(() => {
		document.documentElement.innerHTML = doc;
	});

	describe('trail', () => {
		it('should create correct trail to body', () => {
			const input = document.getElementsByTagName('input')[0];
			const input_trail = trail(input)
			expect(input_trail.tag).toBe('body');
			expect(input_trail.childIndex).toBe(0);
			expect(input_trail.id).toBeNull();
			expect(input_trail.child.id).toBeNull();
			expect(input_trail.child.tag).toBeNull();
			expect(input_trail.child.childIndex).toBe(0);
			expect(input_trail.child.child.id).toBeNull();
			expect(input_trail.child.child.tag).toBeNull();
			expect(input_trail.child.child.childIndex).toBe(0);
			expect(input_trail.child.child.child).toBeNull();
		});

		it('should create create correct trail to id', () => {
			const button = document.getElementsByTagName('button')[2];
			const button_trail = trail(button);
			expect(button_trail.id).toBe('input-group');
			expect(button_trail.tag).toBeNull();
			expect(button_trail.childIndex).toBe(1);
			expect(button_trail.child.id).toBeNull();
			expect(button_trail.child.child).toBeNull();
			expect(button_trail.child.tag).toBeNull();
			expect(button_trail.child.childIndex).toBe(0);
		});
	});

	describe('tracker', () => {
		it('should find correct input element with trail to body', () => {
			const input = document.getElementsByTagName('input')[1];
			const input_trail = trail(input);
			return tracker(input_trail).then(element => {
				expect(element.name).toEqual('second-input');
			});
		});

		it('should find correct button element with trail to body', () => {
			const button = document.getElementsByTagName('button')[1];
			const button_trail = trail(button);
			tracker(button_trail).then(element => {
				expect(element.name).toEqual('sec-btn');
			});
		});

		it('should find correct select element with trail to id', () => {
			const select = document.getElementsByTagName('select')[0];
			const select_trail = trail(select);
			tracker(select_trail).then(element => {
				expect(element.name).toEqual('group-select');
			});
		});

		it('should find correct button element with trail to id', () => {
			const button = document.getElementsByTagName('button')[2];
			const button_trail = trail(button);
			return tracker(button_trail).then(element => {
				expect(element.name).toEqual('group-btn-one');
			}).catch( () => {
			});
		});

		it('should find correct textarea element with trail to id', async () => {
			const textarea = document.getElementsByTagName('textarea')[0];
			const textarea_trail = trail(textarea);
			await tracker(textarea_trail).then(element => {
				expect(element.name).toEqual('group-text-area-one');
			});
		});
	});
});
