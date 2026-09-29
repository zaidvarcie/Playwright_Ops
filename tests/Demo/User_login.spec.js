

const { test, expect } = require("../../utils/login.js");


// group tests related to user login functionality

test.describe.configure({ mode: "serial" });

test.skip("Open Login Page", async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/login");
})

test("Login user already logged in", async ({ page, loggedin }) => {
    // Verify that the user is already logged in by checking for the presence of the "Log out" button
    await expect(page.getByRole("link", { name: "Log out" })).toBeVisible();

    const welcomeMessage = await page.locator(".topic-html-content-title h2").textContent();
    expect(welcomeMessage.trim()).toBe("Welcome to our store");
    console.log("Welcome message is: " + welcomeMessage);

});

test("Verify dashboard content after login", async ({ page, loggedin }) => {
    await expect(page.locator("img.nivo-main-image")).toBeVisible();
    expect(page.url()).toBe("https://demowebshop.tricentis.com/");
    expect(await page.title()).toBe("Demo Web Shop");
    expect(await page.locator(".title strong").filter({ hasText: "Featured products" })).toBeVisible();
    await expect(page.locator(".topic-html-content-title h2")).toHaveText("Welcome to our store");
});


test.only("Search for a product after login", async ({ page, loggedin }) => {

    await page.locator("[id='small-searchterms']").fill("laptop");


    const term = 'laptop';
    await page.fill('[id="small-searchterms"]', term);
    await Promise.all([
        page.waitForNavigation({ url: /search/ }),     // waits for the search results page
        page.getByRole('button', { name: 'Search' }).click(),
    ]);

    const searchResult = await page.locator('.search-text:has-text("laptop")').textContent();
    expect(searchResult.trim()).toBe(`Search term: ${term}`);
    console.log("Search result is: " + searchResult);
})

// Capture a screenshot after successful login


test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === "failed") {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
});