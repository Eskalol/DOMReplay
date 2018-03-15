import Logger from './logger';

// HTMLElements using this classname will be ignored
export const domreplayIgnoreClassName = 'dom-replay-ignore';

/**
 * Generator function that creates an iterator of
 * elements by tag name
 * @param {String} tagname     - HTML tag name
 * @yield {HTMLElement} Element
 */
function* elementByTagNameIterator(tagname) {
	const elements = document.getElementsByTagName(tagname);
	yield* Array.from(elements).map(element => element);
}

/**
 * Initializes events on elements in the dom.
 * @param  {Array} events - list of events
 */
const initializeEvents = (events) => {
	Logger.debug('Initializing existing events.');
	events.forEach(event => {
		event.tagnames.forEach(tagname => {
			for (let element of elementByTagNameIterator(tagname)) {
				if (!element.className.includes(domreplayIgnoreClassName)) {
					Logger.debug(`Adding ${event.type} event listener to element`);
					element.addEventListener(event.type, () => event.handler(element), false);
				}
			}
		});
	});
}

/**
 * Flattens the node tree and yields only,
 * HTML elements with tagnames that should,
 * be tracked.
 * @param {[type]} mutation      		- mutation object from the mutation observer.
 * @param {Array[String]} tagfilter     - tagnames that should be tracked
 * @yield {HTMLElement} yields trackable HTMLElements.
 */
function* getFlatElementIterator(mutation, tagfilter) {
	const recursiveFlat = function* (node) {
		if (node instanceof HTMLElement &&
					tagfilter.includes(node.tagName.toLowerCase()) &&
					!node.className.includes(domreplayIgnoreClassName)
				) {
			yield node;
		} else if (node.childNodes.length > 0) {
			for (let n of Array.from(node.childNodes)) {
				yield* recursiveFlat(n, tagfilter);
			}
		}
	}

	for (let node of Array.from(mutation.addedNodes)) {
		yield* recursiveFlat(node);
	}
}

/**
 * To ensure that the only top level element is captured in tagnames,
 * we need a filter. for example when a button contains an 'a' tag,
 * only the button is captured.
 * @param  {[type]} events [description]
 * @return {[type]}        [description]
 */
const flatTagnames = (events) => {
	let tagnames = []
	events.forEach(event => {
		tagnames.push(...event.tagnames);
	});
	return tagnames;
}

/**
 * Initializes mutation observer,
 * when ever a new element has been added, it will automaticly
 * add event listener to the element.
 * @param  {Array} events - list of events
 */
const initializeMutationObserver = (events) => {
	Logger.debug('Initializing mutation observer.');
	const tagfilter = flatTagnames(events);
	const analyzeElement = (element) => {
		events.forEach(event => {
			if (event.tagnames.includes(element.tagName.toLowerCase())) {
				Logger.debug(`mutationobserver is adding a ${event.type}-listener to element ${element.id}`);
				element.addEventListener(event.type, () => event.handler(element), false);
			}
		});
	}

	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			for (let element of getFlatElementIterator(mutation, tagfilter)) {
				analyzeElement(element);
			}
		});
	});

	const config = {
      childList: true,
      subtree: true
    };

    observer.observe(document.body, config);
}

/**
 * Initializes events on existing elements,
 * and initializes the mutation observer when
 * document is ready.
 * @param  {Array} events - list
 */
export const domloader = (events) => {
	return new Promise((resolve, reject) => {
		const time = setInterval(() => {
			if (document.readyState !== 'complete') {
				Logger.debug('Ready-state check failed!');
				return;
			}
			clearInterval(time);
			initializeEvents(events);
			initializeMutationObserver(events);
			Logger.debug('Done initializing events');
			resolve();
		}, 100);
	});
}
