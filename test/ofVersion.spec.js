describe("OpenFin Version", () => {
    it("should match the version in the app manifest", async () => {
        let stable = "13.76.44.21";
        let pages = await browser.pages();
        let page = pages[0];
        let ofVersion = await page.evaluate(() => fin.System.getVersion());
        assert.equal(ofVersion, stable);
    });
});
