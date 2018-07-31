
export default class UrlParser {
	buildUrl(id, autoplay = false) {
		return `${window.location.origin}?replayjs_id=${id}${autoplay ? '&replayjs_autoplay=true' : ''}`;
	}

	autoplay() {
		const auto = new URLSearchParams(document.location.search).get('replayjs_autoplay');
		console.log(auto);
		return !!auto && auto === 'true';
	}

	containsId() {
		return !!new URLSearchParams(document.location.search).get('replayjs_id');
	}

	getId() {
		console.log(new URLSearchParams(document.location.search).get('replayjs_id'));
		return new URLSearchParams(document.location.search).get('replayjs_id');
	}
}
