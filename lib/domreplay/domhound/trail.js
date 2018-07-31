'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * Iterates over previous siblings to find its index.
 * @param {HTMLElement} element		- HTMLElement to find index.
 * @param {Number} index 					- current index.
 * @returns {Number}							- sibling index of element passed.
 * @private
 */
var _getSiblingIndex = function _getSiblingIndex(element, index) {
	if (element.previousElementSibling == null) {
		return index;
	}
	return _getSiblingIndex(element.previousElementSibling, ++index);
};

/**
 * Creates a trail according to its ancestors and siblings recursively.
 * @param {HTMLElement} element 	- HTMLElement to make trail of
 * @param {Object} child					- child branch.
 * @param {Number} childIndex
 * @returns {Object}
 * @access public
 */
var trail = exports.trail = function trail(element) {
	var child = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	var childIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	if (element.id) {
		return {
			id: element.id,
			child: child,
			tag: null,
			childIndex: childIndex
		};
	} else if (element.tagName.toLowerCase() === 'body') {
		return {
			id: null,
			child: child,
			tag: element.tagName.toLowerCase(),
			childIndex: childIndex
		};
	}
	return trail(element.parentNode, {
		id: null,
		child: child,
		tag: null,
		childIndex: childIndex
	}, _getSiblingIndex(element, 0));
};