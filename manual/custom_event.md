# How to record and replay your custom event
The framework makes it easy to implement your own event.
Since adding event listeners, storage, and replaying functionality is handled under the hood the only thing we have to think of is handle and replay.

### Create the custom event class.
Example of an Click event class with the mandatory functions implemented.
```javascript
import { EventBaseClass } from 'domreplay';

export default class MyButtonEvent extends {
	
	// Event type to record.
	// This has to be an unique event type added to the registry.
	get eventType() {
		return 'click';
	}
	
	// list of tagnames where we should add handlers.
	get tagnames() {
		return ['button', 'a'];
	}
	
	// This handler will be called when the framework is in record state.
	// and an element has been clicked.
	// The element will be passed as an argument.
	handler(element) {
		// make trail to identify the element which has been clicked.
		const trail = this.makeTrailForElement(element);
		
		// store the information.
		// You'll be free to put what ever you want here, just make sure to
		// have a plan how to interpret the data afterwards.
		this.syncStore({ trail });
	}
	
	// This function will be called when an event is about to be replayed
	// with this.eventType.
	// The information about the event to be played will be passed as
	// an argument. Notice this is the information you stored in the
	// handler function.
	replay(eventObject) {
		return this.trackElementOnTrail(eventObject.trail)
			.then(element => {
				// adding a border to highlight the element;
				this.addDomReplayBorderToElement(element);
				
				// executing click event after some time.
				return this.executeTimingRelative(() => {
					element.click();
					this.removeDomReplayBorderFromElement(element);
					return element;
				});
			});
	}
	
};
```

### Add the custom event to registry.
Before our newly created event will be in use by the framework we have to add it to the registry first.
It is important to call initialize on DomReplay object after the Registry has been populated.
```javascript
import DomReplay, { Registry } from 'domreplay'; 
import MyButtonEvent from './myButtonEvent';

Registry.registerEvent(new MyButtonEvent());
const domreplay = new DomReplay();
domreplay.initialize();
```

And thats it!

## Replay Timing and ratio.

### Timing
Timing can easily be changed as we want. It is useful to slow down or speed up replays.
The default value is set to 1000ms

Example how to set the _replayTiming variable from constructor
```javascript
import { EventBaseClass } from 'domreplay';

export default class MyEvent extends {
	constructor() {
		super();
		this._replayTiming = 2000;
		// timing is set to 2000ms
	}
}

```

From the outside just use the timing setter.
```javascript
	const event = new MyEvent();
	event.timing = 500;
	// timing is set to 500ms
```

### Ratio
Some actions happens faster than other. To mimic a more human behaviour for instance typing into an input field,
we can pass the ratio parameter into the executeTimingRelative function.

In this example the function is called after half of the replayTiming variable.
```javascript
this.executeTimingRelative(() => {
	// do stuff.
}, 0.5);
```

