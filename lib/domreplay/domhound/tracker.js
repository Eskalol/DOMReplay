'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.tracker = undefined;

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recursiveTracker = function recursiveTracker(element, trail) {
	if (!trail.child) {
		return element;
	} else {
		return recursiveTracker(element.children.item(trail.childIndex), trail.child);
	}
	return null;
};

var tracker = exports.tracker = function tracker(trail) {
	return new Promise(function (resolve, reject) {
		var element = void 0;
		if (trail.id && !trail.child) {
			element = document.getElementById(trail.id);
		} else if (trail.id && trail.child) {
			element = recursiveTracker(document.getElementById(trail.id), trail);
		} else if (trail.tag === 'body' && trail.child) {
			element = recursiveTracker(document.body, trail);
		}
		if (!element) {
			reject(null);
		} else {
			resolve(element);
		}
	});
};