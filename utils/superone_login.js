


const { test: base, expect } = require("@playwright/test");

const test = base.extend({

    loggedin: async ({ page }, use) => {

        await page.goto("https://quickdev1.super.one/webapp/login");

        await page.getByPlaceholder("Email address").fill("max7@t.com");

        await page.locator(".input-btn").click();

        await page.getByPlaceholder("Enter password").fill("Test@123");

        await page.getByRole("button", { name: "Log in" }).click();

        await use(page);

    }

});

module.exports = { test, expect };