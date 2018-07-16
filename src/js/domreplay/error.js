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

export const STORAGE_ERROR = 'STORAGE_ERROR';

export const createStorageError = (message) => {
	return {
		type: STORAGE_ERROR,
		message
	}
}



export class ProgrammingError extends Error {
	constructor(message, ...args) {
		super(`DOM-Replay programming Error: ${message}`, ...args);
		Error.captureStackTrace(this, ProgrammingError);
	}
}

