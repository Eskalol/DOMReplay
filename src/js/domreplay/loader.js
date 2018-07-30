import Logger from './logger';
import RegistrySingleton from './registry';

// HTMLElements using this attribute will be ignored
export const domreplayIgnoreAttributeName = 'dom-replay-ignore';

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
 */
const initializeEvents = () => {
	Logger.debug('Initializing existing events.');
	for (let tagname of RegistrySingleton.getTagnames()) {
		let events = RegistrySingleton.getEventsByTagname(tagname);
		for (let element of elementByTagNameIterator(tagname)) {
			if (!element.hasAttribute(domreplayIgnoreAttributeName)) {
				for (let event of events) {
					Logger.debug(`Adding ${event.eventType} event listener to element`);
					element.addEventListener(event.eventType, () => event._handler(element), false);
				}
			}
		}
	}
}

/**
 * Flattens the node tree and yields only,
 * HTML elements with tagnames that should,
 * be tracked.
 * @param {[type]} mutation      		- mutation object from the mutation observer.
 * @param {Array[]} tagfilter     - tagnames that should be tracked
 * @yield {HTMLElement} yields trackable HTMLElements.
 */
function* getFlatElementIterator(mutation, tagfilter) {
	const recursiveFlat = function* (node) {
		if (node instanceof HTMLElement &&
					tagfilter.includes(node.tagName.toLowerCase()) &&
					!node.hasAttribute(domreplayIgnoreAttributeName)
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
 * Initializes mutation observer,
 * when ever a new element has been added, it will automaticly
 * add event listener to the element.
 */
const initializeMutationObserver = () => {
	Logger.debug('Initializing mutation observer.');
	const analyzeElement = (element) => {
		if (RegistrySingleton.getTagnames().includes(element.tagName.toLowerCase())) {
			for (let event of RegistrySingleton.getEventsByTagname(element.tagName.toLowerCase())) {
				Logger.debug(`mutationobserver is adding a ${event.eventType}-listener to element ${element.id}`);
				element.addEventListener(event.eventType, () => event._handler(element), false);
			}
		}
	}

	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			for (let element of getFlatElementIterator(mutation, RegistrySingleton.getTagnames())) {
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
 * @access private
 * @param  {Boolean} test -  if true mutation observer is disabled.
 */
export const domloader = (test=false) => {
	return new Promise(resolve => {
		const time = setInterval(() => {
			if (document.readyState !== 'complete') {
				Logger.debug('Ready-state check failed!');
				return;
			}
			clearInterval(time);
			initializeEvents();

			// Don't initialize mutation observer when testing.
			if (!test) {
				initializeMutationObserver();
			}
			Logger.debug('Done initializing events');
			resolve();
		}, 100);
	});
}
