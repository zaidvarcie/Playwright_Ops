

const {test, expect} = require('@playwright/test');

test("Open Home page", async ({page}) => {

    await page.goto("https://demo.nopcommerce.com/")
    expect(await page.title()).toBe("nopCommerce demo store");

    expect(page.url()).toBe("https://demo.nopcommerce.com/");
})