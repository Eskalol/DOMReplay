import { Storage } from '../../src/js';

jest.mock('../../src/js/domreplay/state', () => ({
	stateIsRecord: () => true
}));

describe('Storage', () => {
	afterEach(() => {
		Storage.clear();
	});

	it('should store one event', () => {
		return Storage.store('click', {trail: 'a trail'})
			.then(() => {
				expect(Storage.size).toBe(1);
				expect(Storage.getItem(0).trail).toBe('a trail');
				expect(Storage.getItem(0).type).toBe('click');
			});
	});

	it('should store multiple events', () => {
		return Storage.store('click', {trail: 'just another trail'})
			.then(Storage.store('input', {trail: 'such trail', value: 'wow'}))
			.then(() => {
				expect(Storage.size).toBe(2);
				expect(Storage.getItem(0).trail).toBe('just another trail')
				expect(Storage.getItem(0).type).toBe('click');
				expect(Storage.getItem(1).trail).toBe('such trail');
				expect(Storage.getItem(1).type).toBe('input');
				expect(Storage.getItem(1).value).toBe('wow');
			});
	});

	it('should get last stored event', () => {
		return Storage.store('click', {trail: 'what a trail'})
			.then(() => {
				expect(Storage.size).toBe(1);
				expect(Storage.getLastStored().type).toBe('click');
				expect(Storage.getLastStored().trail).toBe('what a trail');
			});
	});

	it('should get last stored event when multiple events stored', () => {
		return Storage.store('input', {trail: 'ohh you trail', value: 'all hail and nail pale ale!'})
			.then(Storage.store('click', {trail: 'too much meme trailz'}))
			.then(() => {
				expect(Storage.getLastStored().type).toBe('click');
				expect(Storage.getLastStored().trail).toBe('too much meme trailz');
				expect(Storage.size).toBe(2);
			});
	});

	it('should update last stored event', () => {
		return Storage.store('input', {trail: 'wow trail', value: 'ohh'})
			.then(Storage.updateLastStored({value: 'ohh you!'}))
			.then(() => {
				expect(Storage.size).toBe(1);
				expect(Storage.getLastStored().value).toBe('ohh you!');
			});

	});

	it('should update last stored event when there is multiple events in storage', () => {
		return Storage.store('click', {trail: 'trailz inc!'})
			.then(Storage.store('input', {trail: 'wow trail', value: 'ohh'}))
			.then(Storage.updateLastStored({value: 'ohh you!'}))
			.then(() => {
				expect(Storage.size).toBe(2);
				expect(Storage.getLastStored().value).toBe('ohh you!');
			});
	});
});
