




const recursiveTracker = (element, trail) => {
	if (!trail.child) {
		return element;
	} else {
		return recursiveTracker(element.children.item(trail.childIndex), trail.child);
	}
	return null;
}

export const tracker = (trail) => {
	return new Promise((resolve, reject) => {
		let element = null;
		if (trail.id && !trail.child) {
			element = document.getElementById(trail.id);
		} else if (trail.id && trail.child) {
			element = recursiveTracker(document.getElementById(trail.id), trail);
		} else if (trail.tag === 'body' && trail.child) {
			element = recursiveTracker(document.getElementsByTagName(trail.tag)[0], trail);
		}
		if (!element) {
			reject(null);
		} else {
			resolve(element);
		}
	});
}
