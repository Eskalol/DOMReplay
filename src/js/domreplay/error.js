/**
 * Constants and error objects which is thrown
 */

export const STATE_ERROR = 'STATE_ERROR';

export const createStateError = (message) => {
	return {
		type: STATE_ERROR,
		message
	};
}
