




const getSiblingIndex = (element, index) => {
	if (element.previousSibling == null) {
		return index;
	}
	return getSiblingIndex(element.previousSibling, ++index);
}


export const trail = (element, child, childIndex) => {
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
	}, getSiblingIndex(element, 0));
}
