const { test, expect } = require('@playwright/test');

const users = require("../../utils/user_data.json");


test.describe("Existing user", () => {

    test.describe.configure({ mode: "serial" });


    // =========================================================
    // TEST 1 - Launch Login Page
    // =========================================================

    test("@login Launch login page", async ({ page }) => {

        // maximize the screen
        page.setViewportSize({ width: 1320, height: 1080 });

        await page.goto("https://quickdev1.super.one/webapp/login");

        // scroll to the bottom of the page
        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

    });


    // =========================================================
    // TEST 2 - Verify WhatsApp and Login Page Elements
    // =========================================================

    test("@login Verify Whatsapp button should be visible on the login page", async ({ page, context }) => {

        // maximize the screen
        page.setViewportSize({ width: 1320, height: 1080 });

        await page.goto("https://quickdev1.super.one/webapp/login");


        // Verify the onboarding text present on the login page

        const heading = page.locator(
            ".onboarding-flow-parent.onboarding-join-primary .onboarding-heading"
        );

        await expect(heading).toHaveText("Join or log in");


        // whatsapp image is visible on the login page

        await page.locator("a img[src*='whatsapp']").isVisible();


        // whatsapp class is visible on the login page

        await page.locator(".whatsapp").isVisible();


        // Verify the text of the whatsapp button

        await page.locator("a span")
            .nth(0)
            .filter({ hasText: "Continue with WhatsApp" })
            .isVisible();


        // Verify the text present below the whatsapp button

        await page.locator(".whatsapp-recommended")
            .filter({
                hasText: " Recommended — the fastest and most secure way to access SuperOne. "
            })
            .isVisible();


        // input icon present on email text box

        await page.locator("span img[src*='mail']").isVisible();


        // arrow button present on the email text box

        await page.locator(".input-box button").isVisible();


        // Verify the Receive announcement text present below the email text box

        await page.getByLabel(
            "Receive announcement and marketing letters."
        ).isVisible();


        // Verify the checkbox is checked by default

        await expect(
            page.locator("input[type='checkbox']")
        ).toBeChecked();


        // Verify the previous sign in text

        const previousSignInText = await page
            .locator(".previous-signin-link")
            .textContent();

        expect(previousSignInText).toContain(
            "Used SuperOne before? Show previous sign-in options"
        );


        // Verify the Support and Privacy text present on the login page

        await page.locator(".join-utility-links a").nth(0).isVisible();

        await page.locator(".join-utility-links a").nth(1).isVisible();


        // Click on the Support link and verify the URL

        const [newPage] = await Promise.all([
            context.waitForEvent("page"),
            page.locator(".join-utility-links a").nth(0).click()
        ]);


        await newPage.waitForLoadState();


        await expect(newPage.url()).toContain(
            "https://superonehelp.atlassian.net/servicedesk"
        );


        // Click on the Privacy link and verify the URL

        await newPage.close();

        await page.locator(".join-utility-links a").nth(1).click();

    });


    // =========================================================
    // TEST 3 - Login With Valid Credentials
    // =========================================================

    test("@login Verify user can login with valid email adrress", async ({ page }) => {

        // maximize the screen
        // page.setViewportSize({ width: 1120, height: 449 });

        await page.goto("https://quickdev1.super.one/webapp/login");


        await page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });


        await page.getByPlaceholder("Email address")
            .fill(users.validUser.email);


        await page.locator("button.input-btn")
            .click();


        await page.getByPlaceholder("Enter password")
            .fill(users.validUser.password);


        // Verify Forget password is present

        await page.locator(".link a").isVisible();


        await page.getByRole("button", { name: "Log in" })
            .click();


        await page.pause();

    });


    // =========================================================
    // TEST 4 - Verify Forget Password
    // =========================================================

    test.only("@login Verify forget password", async ({ page }) => {

        await page.goto("https://quickdev1.super.one/webapp/login");


        await page.getByPlaceholder("Email address")
            .fill(users.validUser.email);


        await page.locator("button.input-btn")
            .click();




    });

});