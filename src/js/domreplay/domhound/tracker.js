/**
 * Recursively tracks down the element according to its trail.
 * @param element
 * @param trail
 * @returns {*}
 * @access private
 */
const _recursiveTracker = (element, trail) => {
	if (!trail.child) {
		return element;
	} else {
		return _recursiveTracker(element.children.item(trail.childIndex), trail.child);
	}
	return null;
}

/**
 * Tracks down element according to trail.
 * @param trail
 * @returns {Promise<HTMLElement> | Promise<null>}
 * @access public
 */
export const tracker = (trail) => {
	return new Promise((resolve, reject) => {
		let element;
		if (trail.id && !trail.child) {
			element = document.getElementById(trail.id);
		} else if (trail.id && trail.child) {
			element = _recursiveTracker(document.getElementById(trail.id), trail);
		} else if (trail.tag === 'body' && trail.child) {
			element = _recursiveTracker(document.body, trail);
		}
		if (!element) {
			reject(null);
		} else {
			resolve(element);
		}
	});
}
