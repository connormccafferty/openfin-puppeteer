describe("Main Window Identity", () => {
    it("should match the uuid in the app config", async () => {
        let pages = await browser.pages();
        let identity = await getOpenfinId(pages[0]);
        assert.equal(identity.uuid, "testing-app");
    });
});

async function getOpenfinId(page) {
    return await page.evaluate(() => fin.Window.getCurrentSync().identity);
}
