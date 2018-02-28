export default class Util {
  constructor(debugmode) {
    this.debugmode = debugmode;
  }

  error(msg) {
    console.log(`DOMReplay - ERROR - ${msg}`);
  }

  debug(msg) {
    if (this.debugmode) {
      console.log(`DOMReplay - DEBUG - ${msg}`);
    }
  }

  debugLiteral(msg) {
    if (this.debugmode) {
      console.log(msg);
    }
  }
}
