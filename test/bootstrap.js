const assert = require("assert");
const { expect } = require("chai");
const puppeteer = require("puppeteer-core");
const fetch = require("node-fetch");
const _ = require("lodash");
const globalVariables = _.pick(global, ["browser", "assert", "expect"]);

before(function(done) {
    // expose global variables
    global.assert = assert;
    global.expect = expect;
    global.getWindowByTitle = getWindowByTitle;

    // connect to openfin app via remote debugging websocket
    fetch(`http://127.0.0.1:9222/json/version`)
        .then(async response => {
            let { webSocketDebuggerUrl } = await response.json();
            global.browser = await puppeteer.connect({
                browserWSEndpoint: webSocketDebuggerUrl
            });
            done();
        })
        .catch(console.error);
});

after(() => {
    browser.close();

    global.browser = globalVariables.browser;
    global.assert = globalVariables.assert;
    global.expect = globalVariables.expect;
});

async function getWindowByTitle(title) {
    let pages = await browser.pages();

    for (let i = 0; i < pages.length; i++) {
        let pageTitle = await pages[i].title();
        if (pageTitle === title) return pages[i];
    }

    return null;
}
