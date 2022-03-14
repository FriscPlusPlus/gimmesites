const axios = require('axios').default;
const cheerio = require('cheerio');
const url = require('url');
const util = require('util');
const EventEmitter = require('events');
const dns = require('dns');
const { debug } = require('console');
const lookup = util.promisify(dns.lookup);

const eventEmitter = new EventEmitter();

class BingSearch {
  constructor(target, options) {
    this.target = target;
    options = {
      ...options,
    };
    this.bTor = options.bTor || false;
    this.bProxy = options.bProxy || false;
    this.proxyType = options.proxyType;
    this.proxyHost = options.proxyHost;
    this.proxyPort = options.proxyPort;
    this.pageCount = options.pageCount.length > 0 ? options.pageCount : 100;
    this.saveLink = [];
  }

  async search() {
    if (!this._checkCloudflare(this.host)) {
      let urls = [],
        allRequests;
      for (var i = 0; i < this.pageCount; i++) {
        urls.push(
          `https://www.bing.com/search?q=ip%3a%22${this.target}%22&first=${i}&FORM=PERE`
        );
      }
      allRequests = this._buildRequests(urls);
      await this._sendRequests(allRequests);
    } else {
      eventEmitter.emit('error', { bCloudFlare: true });
    }
  }

  static _getRandomAgent() {
    let desktop_agents = [
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14',
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
      'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0',
    ];
    return desktop_agents[Math.floor(Math.random() * desktop_agents.length)];
  }

  _buildRequests(urls) {
    let allRequests = [];
    const headers = {
      'User-Agent': this.constructor._getRandomAgent(),
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    for (let url of urls) {
      allRequests.push(
        axios({
          url: url,
          method: 'GET',
          headers: headers,
        })
      );
    }
    return allRequests;
  }

  async _sendRequests(allRequests) {
    eventEmitter.emit('search');
    let data = [];
    axios
      .all(allRequests)
      .then((data) => this._parseToDomains(data))
      .catch((error) => {
        eventEmitter.emit('error', error);
      });
  }

  _isInArray(url) {
    const bElement = this.saveLink.find((element) => element === url)
      ? true
      : false;
    return bElement;
  }

  async _verifyUrl(url) {
    const bSameIP = (await lookup(url.host)).address === this.target;
    return {
      url: `${url.protocol}//${url.host}`,
    };
  }

  _parseToDomains(data) {
    eventEmitter.emit('clean', this._countTotalUrl(data));
    for (let response of data) {
      const $ = cheerio.load(response.data);
      $('.b_algo').each((index, element) => {
        const $ = cheerio.load(element.children[0]);
        const link = url.parse($('a').attr('href'));
        const bDuplicate = this._isInArray(link.host);
        if (!bDuplicate) {
          this.saveLink.push(link.host);
          const bLink = this._verifyUrl(link).then(
            function (data) {
              this._returnLinks(data.url);
            }.bind(this)
          );
        }
      }, this);
    }
  }

  _countTotalUrl(data) {
    const urls = [];
    for (let response of data) {
      const $ = cheerio.load(response.data);
      $('.b_algo').each((index, element) => {
        const $ = cheerio.load(element.children[0]);
        const link = url.parse($('a').attr('href'));
        urls.push(link.host);
      });
    }
    return urls.length;
  }

  _returnLinks(link) {
    eventEmitter.emit('links', link);
  }
  _checkCloudflare(host) {
    
  }

  on(eventID, method) {
    eventEmitter.on(eventID, method);
  }
}

module.exports = BingSearch;
