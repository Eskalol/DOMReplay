# DOMREPLAY

[![Build Status][travis-image]][travis-url]


[travis-image]: https://img.shields.io/travis/Eskalol/DOMReplay/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/Eskalol/DOMReplay

> Record and Replay your events in the browser.


# Basic usage
```javascript
import DomReplay, { Hud } from 'domreplay';
const domreplay = new DomReplay({debugmode: true});

// If you also want to render the shipped hud.
const hud = new Hud(domreplay, {showRecordIndicator: true, showReplayIndicator: true});
hud.render();
```


# Guides
* [Custom Element Tracker](./manual/custom_element_tracker.md)
* [Custom event](./manual/custom_event.md)
