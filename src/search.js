const axios = require('axios').default;
const cheerio = require('cheerio');
const url = require("url");
const util = require('util');
const dns = require('dns');
const lookup = util.promisify(dns.lookup);


class Search {
    constructor(target, options) {
        this.target = target;
        options = {
            ...options
        };
        this.bTor = options.bTor || false;
        this.bProxy = options.bProxy || false;
        this.proxyType = options.proxyType;
        this.proxyHost = options.proxyHost;
        this.proxyPort = options.proxyPort;
        this.pageCount = options.pageCount.length > 0 ? options.pageCount : 100;
        this.saveLink = [];
    }
    
    async main() {
        let url;
        for (var i = 0; i < this.pageCount; i++) {
            url = `https://www.bing.com/search?q=ip%3a%22${this.target}%22&first=${i}&FORM=PERE`
            await this._makeRequest(url);
        }
    }

    static _getRandomAgent() {
        let desktop_agents = ['Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14',
                 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
                 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
                 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36',
                 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'];
        return desktop_agents[Math.floor(Math.random() * desktop_agents.length)];
    }
    
    
    async _makeRequest(url) {
        const headers = { 'User-Agent' : this.constructor._getRandomAgent(), 'Content-Type': 'application/x-www-form-urlencoded' };
        axios({
            url: url,
            method: 'GET',
            headers: headers
        })
        .then(data => this._parseToDomains(data.data))
        .catch(error => console.log(error));
    }

    async _verifyUrl(url) {
        const bElement = this.saveLink.find(element => element === url.host) ? false : true;
        const bSameIP =  (await lookup(url.host)).address === this.target;
        return {
            url: url.host,
            isValid: bElement && bSameIP
        };
    }

    _parseToDomains(data) {
        const $ = cheerio.load(data);
        $('.b_algo').each((index, element) => {
            const $ = cheerio.load(element.children[0]);
            const link = url.parse($('a').attr('href'));
            const bLink = this._verifyUrl(link).then(function(data) {
                this.saveLink.push(data.url);
                this._returnLinks()
            }.bind(this));
        }, this);
    }

    _returnLinks() {
        
    }
}

module.exports = Search;