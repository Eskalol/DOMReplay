export default class DOMLoeader {
  constructor(main) {
    this.main = main;
    this.util = main.util;
    this.util.debug('running dom_loader initializations');
  }

  addEventlistenerToElement(element, handler, event) {
    return element.addEventListener(event, () => handler(this), false);
  }

  initializeEvents() {
    this.main.config.events.forEach(({ event, conf }) => {
      conf.tagnames.forEach((tagname) => {
        document.getElementsByTagName(tagname).forEach((element) => {
          this.addEventlistenerToElement(element, conf.handler, event);
        });
      });
    });
  }

  initializeMutationObserver() {
    const AnalyzeElement = (element) => {
      this.util.debug(`analyzing elemnt ${element.id}, ${element.tagName}`);
      this.main.config.events.forEach(({ event, conf }) => {
        if (element.tagName.toLowerCase() in conf.tagnames) {
          this.util.debug(`mutationobserver is adding a ${event}-listener to element ${element.id}`);
          this.addEventlistenerToElement(element, conf.handler, event);
        }
      });
    };
    this.util.debug('initializing mutation_observer');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.foreach(element => AnalyzeElement(element));
        }
      });
    });
    const config = {
      childList: true,
      subtree: true,
    };
    observer.observe(document.body, config);
  }
}
