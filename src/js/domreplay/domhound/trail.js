/**
 * Iterates over previous siblings to find its index.
 * @param {HTMLElement} element		- HTMLElement to find index.
 * @param {Number} index 					- current index.
 * @returns {Number}							- sibling index of element passed.
 * @private
 */
const _getSiblingIndex = (element, index) => {
	if (element.previousElementSibling == null) {
		return index;
	}
	return _getSiblingIndex(element.previousElementSibling, ++index);
}

/**
 * Creates a trail according to its ancestors and siblings recursively.
 * @param {HTMLElement} element 	- HTMLElement to make trail of
 * @param {Object} child					- child branch.
 * @param {Number} childIndex
 * @returns {Object}
 * @access public
 */
export const trail = (element, child = null, childIndex = 0) => {
	if (element.id) {
		return {
			id: element.id,
			child,
			tag: null,
			childIndex
		}
	} else if (element.tagName.toLowerCase() === 'body') {
		return {
			id: null,
			child,
			tag: element.tagName.toLowerCase(),
			childIndex
		}
	}
	return trail(element.parentNode, {
		id: null,
		child,
		tag: null,
		childIndex
	}, _getSiblingIndex(element, 0));
}
