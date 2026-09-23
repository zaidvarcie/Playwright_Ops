const { test, chromium } = require("@playwright/test");

test("Persistent Chrome", async () => {


    const context = await chromium.launchPersistentContext(
    "C:\\PlaywrightProfile",
    {
        channel: "chrome",
        headless: false,
    }
);

    const page = await context.newPage();
    await page.goto("https://demo.nopcommerce.com");

    await page.pause();

})