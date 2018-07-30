/**
 * Logger Singleton class,
 * used for debug, error and warning logging
 * @access private
 */
class Logger {
	static instance;

	constructor() {
		if (!this.instance) {
			this._debug = false;
			this.instance = this;
		}
		return this.instance;
	}

	/**
	 * Debug logging.
	 * @param  {String} message - message to log.
	 */
	debug(message) {
		if (this._debug) {
			console.log(`%c[DOMReplay - Debug]: ${message}`, 'background: #222; color: #bada55');
		}
	}

	/**
	 * Warning logging.
	 * @param  {String} message - message to log
	 */
	warning(message) {
		console.warn(`[DOMReplay - Debug]: ${message}`);
	}

	/**
	 * Error logging.
	 * @param  {String} message - message to log
	 */
	error(message) {
		console.error(`[DOMReplay - Debug]: ${message}`);
	}

	/**
	 * Set to true if we should log debug information
	 * @param  {Boolean} debug - true if debug
	 */
	set logging(debug) {
		this._debug = debug;
	}
}

export default new Logger();
