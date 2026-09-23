


const { test, expect } = require("@playwright/test")

//directmenberone1@gmail.com


// User login test cases

test.describe("user login test cases", async () => {

    test.describe.configure({ mode: "serial" })

    test.skip("@login User land on login page", async ({ page }) => {

        await page.goto("https://quickdev1.super.one/webapp/login")
        //await page.pause()
    })
    test("@login Verify al the social icons are present", async ({ page }) => {

        await page.goto("https://quickdev1.super.one/webapp/login")
        await expect(page.locator("img[src*='whatsapp']")).toBeVisible()
        await expect(page.locator("img[src*='facebook']")).toBeVisible()
        await expect(page.locator("img[src*='login-twitter']")).toBeVisible()
        await expect(page.locator("img[src*='login-apple']")).toBeVisible()
        // use iframes
        await expect(
            page.locator("iframe[title='Sign in with Google Button']")
        ).toBeVisible();

    })
    test("@login Verify user can login with valid email adrress", async ({ page }) => {
        await page.goto("https://quickdev1.super.one/webapp/login")
        await page.getByPlaceholder("Email address").fill("directmenberone1@gmail.com")

        await page.locator(".input-btn").click()

        // Enter Password
        await page.getByPlaceholder("Enter password").fill("Test@123")
        await page.getByRole("button", { name: "Log in" }).click()

        // Verify user is logged in by landing on the wallet page
        await page.waitForLoadState("domcontentloaded")
        await expect(page).toHaveURL("https://quickdev1.super.one/webapp/user/wallet/direct");
    })
    test("@login Verify with invalid email address", async ({ page }) => {
        await page.goto("https://quickdev1.super.one/webapp/login")
        await page.getByPlaceholder("Email address").fill("invalid@gmail.com")
        await page.locator(".input-btn").click()

        // User should see Email Verification page
        await page.waitForLoadState("domcontentloaded")
        await page.locator(".gotham-medium").filter({ hasText: "Email Verification" }).isVisible()
        await page.pause()

    })
    test("@login Verify back button functionality", async ({ page }) => {
        await page.goto("https://quickdev1.super.one/webapp/login")
        await page.getByPlaceholder("Email address").fill("invalid@gmail.com")
        await page.locator(".input-btn").click()
        await page.waitForLoadState("domcontentloaded")
        // Useback arrow button
        await page.locator(" img[src*='arrow-left']").click()

        // Verify the text is present on home page

        await page.locator(".onboarding-heading").textContent().then((text) => {
            expect(text).toContain(" Join or log in ")
        })

    })
    test.only("@login User cancel after entering email address", async ({ page }) => {
        await page.goto("https://quickdev1.super.one/webapp/login")
        await page.getByPlaceholder("Email address").fill("invalid2@gmail.com")
        await page.locator(".input-btn").click()
        await page.waitForLoadState("domcontentloaded")
        await page.getByRole("button", { name: "Cancel" }).click()

        // Verify the text is present on home page

        await page.locator(".onboarding-heading").textContent().then((text) => {
            expect(text).toContain(" Join or log in ")
        })


    })

    test("@Signup Verify user can signup with valid email adrress", async ({ page }) => {

        const createdEmail = `pw_signup_${Date.now().toString().slice(-5)}@gmail.com`;;
        await page.goto("https://quickdev1.super.one/webapp/login")
        await page.getByPlaceholder("Email address").fill(createdEmail)
        await page.locator(".input-btn").click()
        await page.waitForLoadState("domcontentloaded")

        // Verify the Email Verification text is present on the page

        const emailVerificationText = await page.locator(".wallet-subheading").textContent();
        expect(emailVerificationText).toContain(" We have sent a 6 digit code to the email address");

        // Get the response for OTP verification API call

        const otpResponsePromise = page.waitForResponse(response =>
            response.url().includes("/writer/user/verifyUserOtp") &&
            response.request().method() === "POST"
        );
        // Enter OTP in each block

        await page.locator("[type='tel']").first().pressSequentially("123456");


        const otpResponse = await otpResponsePromise;

        expect(otpResponse.status()).toBe(200);

        const body = await otpResponse.json();

        expect(body.success).toBe(true);
        expect(body.message).toBe("OTP verified.");


        // Enter password to complete user sign up

        await page.getByPlaceholder("Enter new password").pressSequentially("Test@123")
        await page.getByPlaceholder("Repeat new password").pressSequentially("Test@123")
        await page.getByRole("button", { name: "Set new password" }).click()

        // Verify user is logged in by landing on the wallet page
        await page.waitForLoadState("domcontentloaded")
        await expect(page).toHaveURL("https://quickdev1.super.one/webapp/user/lootbox");
        await page.pause();
    })


})