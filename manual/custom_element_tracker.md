# Custom Element Tracker
The shipped element tracker assumes its only beeing used within a deterministic system. There might be better ways of creating a trail for the DOM-element and later track it down than the current implementation.

If you want you could plug in your own implementation which serves the purpose yo want.
This is how it should be done:
```javascript
// this function should return a way to
// identify the element which should be used later to track it down.
function myTrail(element) {
	return element.id;
}

// this function should return a promise.
// and hopefully resolve with an element.
function myTracker(trail) {
	return new Promise((resolve, reject) => {
		const element = document.getElementById(trail);
		if (!element) {
			reject(null);
		} else {
			resolve(element);
		}
	});
}

import DomReplay from 'domreplay';
import { Registry, events } from 'domreplay';

// First register some default events.
Registry.registerEvent(new events.ClickEvent());
Registry.registerEvent(new events.InputEvent());

// Set the trail and tracker function
Registry.setTrailFuncForAllEventsInRegistry(myTrail);
Registry.setTrackerFuncForAllEventsInRegistry(myTracker);

// Create Domreplay and initialize!
const domreplay = new Domreplay();
domreplay.initialize();
```
