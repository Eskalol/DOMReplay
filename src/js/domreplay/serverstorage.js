export default class ServerStorage {
  constructor(main) {
    this.main = main;
    this.util = this.main.util;
    this.conf = this.main.config.server;
    this.loadFromServer();
  }

  readyToLoad() {
    if (!this.conf.url) {
      this.debug('Cannot make call to server without url!');
      return false;
    }
    if (!this.main.operatingStateIsPassive()) {
      this.debug('Cannot make a call to server while state is not passive!');
      return false;
    }
    return !this.conf.isLoading;
  }

  loadFromServer() {
    if (!this.readyToLoad()) {
      return;
    }
    this.conf.isLoading = true;

    let urlstring = `${this.conf.url}?session_id=${this.conf.sessionId}`;
    if (!this.conf.userId) {
      urlstring = `${urlstring}&user_id=${this.conf.userId}`;
    }
    this.util.debug(`Attempting to load from url: ${urlstring}`);
    this.util.debug(`conf.user_id: ${this.conf.user_id}, conf.session_id: ${this.conf.session_id}, conf.url: ${this.conf.url}`);
    this.util.debug('conf:');
    this.util.debugLiteral(this.conf);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const config = {
      method: 'GET',
      headers,
    };
    fetch(new Request(urlstring), config).then((response) => {
      this.util.debug(response);
      if (response.status === 200) {
        this.main.storage.updateStorage(response.data);
      }
      this.isLoading = false;
    }).catch((error) => {
      this.util.debug(error);
    });
  }

  pushToServer() {
    if (!this.readyToLoad()) {
      return;
    }
    this.conf.isLoading = true;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Origin', `${this.conf.url}`);
    const config = {
      method: 'POST',
      headers,
    };
    const data = {
      user_id: this.conf.userId,
      session_id: this.conf.session_id,
      data: this.main.storage.data,
    };
    fetch(new Request(this.conf.url), config).then((response) => {
      this.isLoading = false;
    }).catch((error) => {

    });
  }
}
