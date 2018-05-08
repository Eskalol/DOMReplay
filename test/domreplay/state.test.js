import {
	stateIsReplay,
	stateIsRecord,
	stateIsReady,
	setStateReady,
	setStateRecord,
	setStateReplay
} from '../../src/js/domreplay/state';

describe('State', () => {

	it('should not set record state while state is empty', () => {
		expect(setStateRecord()).rejects;
	});


	it('should set ready state fine', () => {
		expect(setStateReplay()).rejects;
	});

	it('should set ready state fine, when no state is set', () => {
		expect(setStateReady()).resolves;
		expect(stateIsReady()).toBeTruthy();
	});

	it('should set record state fine, when state is ready', () => {
		expect(stateIsReady()).toBeTruthy();
		expect(setStateRecord()).resolves;
		expect(stateIsRecord()).toBeTruthy();
	});

	it('should reject when state is other than ready', () => {
		expect(stateIsReady()).toBeFalsy();
		expect(setStateReady()).rejects;
		expect(stateIsReady()).toBeFalsy();
	});

	it('should resolve and change state when set ready state is forced', () => {
		expect(stateIsReady()).toBeFalsy();
		expect(setStateReady(true)).resolves;
		expect(stateIsReady()).toBeTruthy();
	});

	it('should change state to record when state is ready', () => {
		expect(stateIsReady()).toBeTruthy();
		expect(setStateReplay()).resolves;
		expect(stateIsReplay()).toBeTruthy();
	});
});
