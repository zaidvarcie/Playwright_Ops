const { test, expect } = require("@playwright/test");

test("@login Verify user can login with valid credentials", async ({ request }) => {

    // ==============================
    // API 1 - Initiate Login
    // ==============================

    const initiateResponse = await request.patch(
        "https://quickdev1.super.one/writer/v2/user/email/initiatelogin",
        {
            headers: {
                accept: "application/json, text/plain, */*",
                "Device-Type": "web"
            },

            data: {
                deviceToken: null,
                pwaDevice: "Windows",
                deviceType: "WEB",
                recaptchaToken: "YOUR_TOKEN",
                email: "max7@t.com",
                password: "Test@123"
            }
        }
    );

    console.log("Initiate Login Status:", initiateResponse.status());

    const initiateBody = await initiateResponse.json();

    console.log("Initiate Login Response:", initiateBody);


    // ==============================
    // API 2 - Login
    // ==============================

    const loginResponse = await request.patch(
        "https://quickdev1.super.one/writer/user/email/login",
        {
            headers: {
                accept: "application/json",
                "Device-type": "Web"
            },

            data: {
                recaptchaToken: "YOUR_TOKEN",
                email: "max7@t.com",
                password: "Test@123",
                deviceToken: null,
                pwaDevice: "Windows",
                deviceType: "WEB"
            }
        }
    );

    console.log("Login Status:", loginResponse.status());

    const loginBody = await loginResponse.json();

    console.log("Login Response:", loginBody);


    // ==============================
    // Assertions
    // ==============================

    expect(initiateResponse.ok()).toBeTruthy();
    expect(loginResponse.ok()).toBeTruthy();

});