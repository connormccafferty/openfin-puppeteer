const assert = require("assert");
const { expect } = require("chai");
const puppeteer = require("puppeteer-core");
const fetch = require("node-fetch");
const _ = require("lodash");
const globalVariables = _.pick(global, ["browser", "assert", "expect"]);
let wsChromeEndpointUrl;

before(function(done) {
    // expose global variables
    global.assert = assert;
    global.expect = expect;

    // connect to openfin app via remote debugging websocket
    fetch(`http://127.0.0.1:9222/json/version`)
        .then(async response => {
            let data = await response.json();
            wsChromeEndpointUrl = data.webSocketDebuggerUrl;
        })
        .then(async () => {
            global.browser = await puppeteer.connect({
                browserWSEndpoint: wsChromeEndpointUrl
            });
            done();
        })
        .catch(err => console.log(err));
});

// describe("Main Window Identity", () => {
//     it("should match the uuid in the app config", async () => {
//         let pages = await browser.pages();
//         let identity = await getOpenfinId(pages[0]);
//         assert.equal(identity.uuid, "hello");
//     });
// });

// async function getOpenfinId(page) {
//     return await page.evaluate(() => fin.Window.getCurrentSync().identity);
// }

// close browser and reset global variables
after(() => {
    browser.close();

    global.browser = globalVariables.browser;
    global.assert = globalVariables.assert;
    global.expect = globalVariables.expect;
});
