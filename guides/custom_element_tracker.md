# Custom Element Tracker
The shipped element tracker assumes its only beeing used within a deterministic system. There might be better ways of creating a trail for the DOM-element and later track it down than the current implementation.

If you want you could plug in your own implementation which serves the purpose yo want.
This is how it should be done:
```javascript
function myTrail(element) {
	return element.id;
}

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

// method 1
const domreplay = new DomReplay();
domreplay.setCustomElementTracker(myTracker, myTrail);

// method 2
const domreplay = new DomReplay({
	customTracker: {
			trackerFunc: myTracker,
			trailFunc: myTrail
		}
	});

```
