'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var getSiblingIndex = function getSiblingIndex(element, index) {
	if (element.previousElementSibling == null) {
		return index;
	}
	return getSiblingIndex(element.previousElementSibling, ++index);
};

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
	}, getSiblingIndex(element, 0));
};