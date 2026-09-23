const { test, expect } = require('@playwright/test');

test.describe("Landing Page Tests", { retries: 2 }, () => {



test.afterEach(async ({}, testInfo) => {

        if (testInfo.retry > 0) {
            console.log(
                `⚠️ FLAKY TEST: "${testInfo.title}" passed after ${testInfo.retry} retry`
            );
        } else if (testInfo.status === "passed") {
            console.log(
                `✅ STABLE TEST: "${testInfo.title}" passed on first attempt`
            );
        }
    });

    test("@wa Verify user lands on landing page", async ({ page }) => {

        await page.goto("https://quickdev1.super.one/webapp/login");

        await expect(page).toHaveURL(/quickdev1\.super\.one/);

        await expect(page.locator(".onboarding-heading"))
            .toContainText("Join or log in");
    });


    test("@wa Verify elements present on landing page", async ({ page }) => {

        await page.goto("https://quickdev1.super.one/webapp/login");

        // WhatsApp button
        await expect(page.locator(".whatsapp"))
            .toBeVisible();

        // First WhatsApp icon
        await expect(page.locator(".whatsapp img").first())
            .toBeVisible();

        // Last WhatsApp icon
        await expect(page.locator(".whatsapp img").last())
            .toBeVisible();
    });


    test("@wa Verify whatsapp text is present on landing page", async ({ page }) => {

        await page.goto("https://quickdev1.super.one/webapp/login");

        await expect(page.locator(".whatsapp-recommended"))
            .toContainText("Recommended — the fastest");
    });


    test("@wa Verify the text 'or' is present on landing page", async ({ page }) => {

        await page.goto("https://quickdev1.super.one/webapp/login");

        await expect(page.getByText(" or ", { exact: true }))
            .toBeVisible();
    });


    test("@wa Verify the text 'Used Superone before' is present", async ({ page }) => {

        await page.goto("https://quickdev1.super.one/webapp/login");

        await expect(page.locator(".previous-signin-link"))
            .toContainText("Used SuperOne before? Show previous sign-in options");
    });


    test("@wa Verify the show previous link is present on landing page", async ({ page }) => {

        await page.goto("https://quickdev1.super.one/webapp/login");

        await expect(page.locator(".previous-signin-link a"))
            .toBeVisible();
    });

    

});