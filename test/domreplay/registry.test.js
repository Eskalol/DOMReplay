import RegistrySingleton from '../../src/js/domreplay/registry';
import EventBaseClass from '../../src/js/domreplay/eventbaseclass';


class ChangeEvent extends EventBaseClass {
	get eventType() {
		return 'change';
	}

	get tagnames() {
		return ['input'];
	}
}


class InputEvent extends EventBaseClass {
	get eventType() {
		return 'input';
	}

	get tagnames() {
		return ['input'];
	}

}


class ClickEvent extends EventBaseClass {
	get eventType() {
		return 'click';
	}

	get tagnames() {
		return ['a', 'button'];
	}
}


class NonEvent {

}


describe('RegistrySingleton', () => {

	afterEach(() => {
		RegistrySingleton.clearAllEvents();
	});

	it('should be a singleton', () => {
		expect(RegistrySingleton).toEqual(require('../../src/js/domreplay/registry').default);
	});

	it('it should throw programming error when an object is registered where EventBaseClass is not its super class', () => {
		expect(() => {
			RegistrySingleton.registerEvent(new NonEvent());
		}).toThrowError();
	});

	it('should contain input event and event type', () => {
		RegistrySingleton.registerEvent(new ClickEvent());
		RegistrySingleton.registerEvent(new InputEvent());
		expect(RegistrySingleton.size).toBe(2);
	});

	it('should contain input event', () => {
		RegistrySingleton.registerEvent(new InputEvent());
		expect(RegistrySingleton.getEvent('input')).toMatchObject(new InputEvent());
	});

	it('should contain click event', () => {
		RegistrySingleton.registerEvent(new ClickEvent());
		expect(RegistrySingleton.getEvent('click')).toMatchObject(new ClickEvent());
	});

	it('should delete event from registry', () => {
		RegistrySingleton.registerEvent(new ClickEvent());
		expect(RegistrySingleton.getEvent('click')).toMatchObject(new ClickEvent());
		RegistrySingleton.deleteEvent('click');
		expect(RegistrySingleton.getEvent('click')).toBeUndefined();
	});

	it('it should clear all events from registry', () => {
		RegistrySingleton.registerEvent(new ClickEvent());
		RegistrySingleton.registerEvent(new InputEvent());
		expect(RegistrySingleton.size).toBe(2);
		RegistrySingleton.clearAllEvents();
		expect(RegistrySingleton.size).toBe(0);
	});

	it('should set tracker for all events in registry', () => {
		const tracker = jest.fn();
		RegistrySingleton.registerEvent(new InputEvent());
		RegistrySingleton.registerEvent(new ClickEvent());
		RegistrySingleton.setTrackerFuncForAllEventObjectsInRegistry(tracker);
		RegistrySingleton.getEvent('input')._trackElementOnTrail('some trail');
		expect(tracker).toHaveBeenCalledTimes(1);
		expect(tracker).toHaveBeenLastCalledWith('some trail');
		RegistrySingleton.getEvent('click')._trackElementOnTrail('some other trail');
		expect(tracker).toHaveBeenCalledTimes(2);
		expect(tracker).toHaveBeenLastCalledWith('some other trail');
	});

	it('should set trail for all events in registry', () => {
		const trail = jest.fn();
		const firstElement = document.createElement('div');
		const secondElement = document.createElement('button');
		RegistrySingleton.registerEvent(new ClickEvent());
		RegistrySingleton.registerEvent(new InputEvent());
		RegistrySingleton.setTrailFuncForAllEventObjectsInRegistry(trail);
		RegistrySingleton.getEvent('click')._makeTrailForElement(firstElement);
		expect(trail).toHaveBeenCalledTimes(1);
		expect(trail).toHaveBeenLastCalledWith(firstElement);
		RegistrySingleton.getEvent('input')._makeTrailForElement(secondElement);
		expect(trail).toHaveBeenCalledTimes(2);
		expect(trail).toHaveBeenLastCalledWith(secondElement);
	});

	it('should return a list with all event type names', () => {
		RegistrySingleton.registerEvent(new ClickEvent());
		RegistrySingleton.registerEvent(new InputEvent());
		expect(RegistrySingleton.getEventTypes()).toContain('click');
		expect(RegistrySingleton.getEventTypes()).toContain('input');
	});

	it('should return a list of all tagnames in registry', () => {
		RegistrySingleton.registerEvent(new ClickEvent());
		RegistrySingleton.registerEvent(new InputEvent());
		expect(RegistrySingleton.getTagnames().length).toBe(3);
		expect(RegistrySingleton.getTagnames()).toContain('input');
		expect(RegistrySingleton.getTagnames()).toContain('a');
		expect(RegistrySingleton.getTagnames()).toContain('button');
	});

	it('should return event objects by tagname', () => {
		const clickEvent = new ClickEvent();
		const inputEvent = new InputEvent();
		const changeEvent = new ChangeEvent();

		RegistrySingleton.registerEvent(clickEvent);
		RegistrySingleton.registerEvent(inputEvent);
		RegistrySingleton.registerEvent(changeEvent);

		const events = RegistrySingleton.getEventsByTagname('input');
		expect(events.length).toBe(2)
		expect(events).toContain(inputEvent);
		expect(events).toContain(changeEvent);
		expect(events).not.toContain(clickEvent);
	});
});
