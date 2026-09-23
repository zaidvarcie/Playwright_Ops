const { test, expect } = require('@playwright/test');

const Homepage = require('../Pageobject/HomePage');

test('Open Home Page', async ({ page }) => {

    const homepage = new Homepage(page);

    await homepage.openHomePage();

    await expect(page).toHaveTitle(
        "Practice Test Automation | Learn Selenium WebDriver"
    );

    console.log(await page.title());

});

test.skip("Verify Home page content", async ({ page }) => {

    const homepage = new Homepage(page);

    await homepage.openHomePage();

    const Heading = await page.locator("h1").textContent()
    await expect(Heading).toBe("Hello");
    console.log("Heading of the page is: " + Heading);

    // Verify image is displayed on the page

    const image = page.locator("img[alt='Dmitry Shyshkin, your Selenium WebDriver instructor']")
    await expect(image).toBeVisible();

   
})


test.only("Verify company logo", async ({ page }) => {

    const homepage = new Homepage(page);
    await homepage.openHomePage();

    const logo = page.getByAltText("Practice Test Automation");

    // Verify logo is visible
    await expect(logo).toBeVisible();

    // Verify alt text
    await expect(logo).toHaveAttribute(
        "alt",
        "Practice Test Automation"
    );

    // Verify dimensions
    const box = await logo.boundingBox();

    expect(box).not.toBeNull();
    expect(box.width).toBeGreaterThan(0);
    expect(box.height).toBeGreaterThan(0);

});


