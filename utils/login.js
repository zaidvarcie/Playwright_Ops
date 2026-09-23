 
 
const base = require("@playwright/test");

// create a fixture to open the login page before each test
const test = base.test.extend({

    loggedin: async ({ page }, use) => {
        await page.goto("https://demowebshop.tricentis.com/login");
        await page.getByLabel("Email:").fill("903465095@example.com");
        await page.getByLabel("Password:").fill("Password123");
        await page.getByRole("button", { name: "Log in" }).click();
        await use(page);
    }
});

module.exports = { test, expect: base.expect };