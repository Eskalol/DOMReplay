# DOMREPLAY

[![Build Status][travis-image]][travis-url]


[travis-image]: https://img.shields.io/travis/Eskalol/DOMReplay/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/Eskalol/DOMReplay

> Record and Replay your events in the browser.

#### [Documentation](https://eskalol.github.io/DOMReplay)

# Basic usage
domreplay.initialize() has to be called after the registry has been populated.
```javascript
import DomReplay, { Hud, Registry, events } from 'domreplay';
// Populate the registry.
Registry.registerEvent(new events.ClickEvent());
Registry.registerEvent(new events.InputEvent());

// create the dom replay instance and initialize it.
const domreplay = new DomReplay({debugmode: true});
domreplay.initialize();

// If you also want to render the shipped hud.
const hud = new Hud(domreplay, {showRecordIndicator: true, showReplayIndicator: true});
hud.render();
```


# Guides
* [Custom Element Tracker](./manual/custom_element_tracker.md)
* [Custom event](./manual/custom_event.md)
