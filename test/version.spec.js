describe("OpenFin Version", () => {
    it("should match the version in the app manifest", async () => {
        let page = await getWindowByTitle("testing-app");
        let manifestVersion = "13.76.44.21";
        let ofVersion = await page.$eval("#of-version", el => el.textContent);

        assert.equal(ofVersion, manifestVersion);
    });
});
