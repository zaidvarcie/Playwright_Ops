const { test, expect } = require("@playwright/test");

test("@mock Verify login API response", async ({ page }) => {

    // 1. Mock the API
    await page.route(
        "https://quickdev1.super.one/writer/v2/user/email/initiatelogin",
        async (route) => {

            await route.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify({
                    message: "Internal Server Error",
                    success: false,
                    display: true,
                    data: null
                })
            });
        }
    );

    await page.goto("https://quickdev1.super.one/webapp/login");

    await page.getByPlaceholder("Email address").fill("max7@t.com");
    await page.locator(".input-btn").click();
    await page.getByPlaceholder("Enter password").fill("Test@123");


    await page.pause();

    // 2. Start waiting BEFORE clicking Login
    const responsePromise = page.waitForResponse(
        response =>
            response.url().includes("/writer/v2/user/email/initiatelogin") &&
            response.request().method() === "PATCH"
    );

    // 3. Frontend triggers API
    await page.getByRole("button", { name: "Log in" }).click();

    // 4. Capture response
    const response = await responsePromise;

    // 5. Assert HTTP status
    expect(response.status()).toBe(500);

    // 6. Read response JSON
    const responseBody = await response.json();

    // 7. Assert response properties
    expect(responseBody.message).toBe("Internal Server Error");
    expect(responseBody.success).toBe(false);
    expect(responseBody.display).toBe(true);
    expect(responseBody.data).toBeNull();
});