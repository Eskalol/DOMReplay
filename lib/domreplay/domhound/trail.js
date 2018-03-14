'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


var getSiblingIndex = function getSiblingIndex(element, index) {
	if (element.previousSibling == null) {
		return index;
	}
	return getSiblingIndex(element.previousSibling, ++index);
};

var trail = exports.trail = function trail(element, child, childIndex) {
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