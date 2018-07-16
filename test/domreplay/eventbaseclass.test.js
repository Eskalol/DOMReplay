'use strict';

import EventBaseClass from '../../src/js/domreplay/eventbaseclass';
import { ProgrammingError } from '../../src/js/domreplay/error';


class ExampleEvent extends EventBaseClass {
	handler(element) {
		return 'event is handled';
	}

	replay(eventObject) {
		return 'replayed event';
	}

	get eventType() {
		return 'example';
	}
}


describe('EventBaseClass', () => {

	describe('handler function', () => {
		it('should throw programming error when handler not implemented', () => {
			const event = new EventBaseClass();
			expect(() => {
				event.handler(null);
			}).toThrowError();
		});

		it('should not throw error when handler is implemented', () => {
			const event = new ExampleEvent()
			expect(event.handler(null)).toBe('event is handled');
		});
	});

	describe('replay function', () => {
		it('should throw programming error when replay not implemented', () => {
			const event = new EventBaseClass();
			expect(() => {
				event.replay(null);
			}).toThrowError();
		});

		it('should not throw programming error when replay is implemented', () => {
			const event = new ExampleEvent();
			expect(event.replay(null)).toBe('replayed event');
		});
	});

	describe('event type', () => {
		it('should throw programming error when event type is not set', () => {
			const event = new EventBaseClass();
			expect(() => {
				event.eventType;
			}).toThrowError();
		});

		it('it should not throw programming error when event type is set', () => {
			const event = new ExampleEvent();
			expect(event.eventType).toBe('example');
		});
	});

	describe('replay border', () => {
		it('should add replay border class to element', () => {
			const element = document.createElement('div');
			const event = new EventBaseClass();
			event._addDomReplayBorderToElement(element);
			expect(element.classList.contains(EventBaseClass.DOM_REPLAY_BORDER_CLASS)).toBeTruthy();
		});

		it('should remove replay border class to element', () => {
			const element = document.createElement('div');
			const event = new EventBaseClass();
			event._addDomReplayBorderToElement(element);
			expect(element.classList.contains(EventBaseClass.DOM_REPLAY_BORDER_CLASS)).toBeTruthy();
			event._removeDomReplayBorderFromElement(element);
			expect(element.classList.contains(EventBaseClass.DOM_REPLAY_BORDER_CLASS)).toBeFalsy();
		});
	});

	describe('trail end tracker functions', () => {
		it('should set tracker function and be called in the correct way', () => {
			const tracker = jest.fn();
			const event = new EventBaseClass();
			event.trackerFunc = tracker;
			event._trackElementOnTrail('a trail');
			expect(tracker).toBeCalled();
			expect(tracker.mock.calls.length).toBe(1);
			expect(tracker).toBeCalledWith('a trail');
		});

		it('should set trail function and be called in the correct way', () => {
			const trail = jest.fn();
			const event = new EventBaseClass();
			event.trailFunc = trail;
			const element = document.createElement('div');
			event._makeTrailForElement(element);
			expect(trail).toBeCalled();
			expect(trail.mock.calls.length).toBe(1);
			expect(trail).toBeCalledWith(element);
		});
	})

	describe('timing', () => {
		it('should set correct timing', () => {
			const event = new EventBaseClass();
			event.timing = 1000;
			expect(event.timing).toBe(1000);
		});

		it('should execute function after 1000 ms', () => {
			jest.useFakeTimers();
			const event = new EventBaseClass();
			event.timing = 1000;
			event._executeTimingRelative(() => {});
			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
			jest.clearAllTimers();
		});

		it('should execute function after 0.5 relative to timing', () => {
			jest.useFakeTimers();
			const event = new EventBaseClass();
			event.timing = 1000;
			event._executeTimingRelative(() => {}, 0.5);
			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000 * 0.5);
			jest.clearAllTimers();
		})

		it('should execute function', () => {
			const event = new EventBaseClass();
			expect(event._executeTimingRelative(() => 'cool')).resolves.toBe('cool');
		});
	});
});
