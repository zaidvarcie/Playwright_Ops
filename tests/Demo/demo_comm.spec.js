

const { test, expect } = require('@playwright/test');

test("Open Home page", async ({ page }) => {

    await page.goto("https://automationteststore.com/")
    await page.waitForLoadState("domcontentloaded");
    console.log("await page.title():", await page.title());
    expect(await page.title()).toContain("A place to practice your automation skills!");

    expect(page.url()).toBe("https://automationteststore.com/");

    await page.screenshot({ path: "screenshot.png" });

    await page.pause();
})

test.afterEach(async ({ }, testInfo) => {

    if (testInfo.status === "failed") {
        await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
    if (testInfo.retry > 0) {
        console.log(`⚠️ FLAKY TEST: "${testInfo.title}" passed after ${testInfo.retry} retry`);
    }
    else if (testInfo.status === "passed") {
        console.log(`✅ STABLE TEST: "${testInfo.title}" passed on first attempt`);

    }
})