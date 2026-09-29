


const { test, expect } = require('@playwright/test');

import { randomEmail } from '../../utils/email.js';

const Register = require('../../Pageobject/Register.js');

// Generate a random email address for registration



test("Open Register Page", async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/register");

    await expect(page).toHaveTitle(
        "Demo Web Shop. Register"

    );
})

test.only("Register New User", async ({ page }) => {

  const registerPage = new Register(page);
  const email = randomEmail();

  await registerPage.gotoRegisterPage();
  await registerPage.selectGender();
  await registerPage.fillFirstName("John");
  await registerPage.fillLastName("Doe");
  await registerPage.fillEmail(email);
  await registerPage.fillpassword("Password123");
  await registerPage.fillConfirmPassword("Password123");
  await registerPage.clickRegisterButton();
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.locator("a.account").first()).toHaveText(email);
  console.log("Registered with email: " + email);
});