describe("OpenFin Version", () => {
    it("should match the version in the app manifest", async () => {
        let page = await getWindowByTitle("testing-app");
        let { version } = require("../public/app.json").runtime;
        let ofVersion = await page.$eval("#of-version", el => el.textContent);

        assert.equal(ofVersion, version);
    });
});
