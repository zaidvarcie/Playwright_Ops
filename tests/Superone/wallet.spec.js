const { test, expect } = require("../../utils/superone_login");

test("@wallet Verify user lands on wallet page", async ({ loggedin, page }) => {

   await expect(loggedin).toHaveURL(/wallet/);
    

   // increase view port

    await page.setViewportSize({ width: 1380, height: 720 });

    // scroll down to the page

    await page.evaluate(() => {

            window.scrollBy(0, window.document.body.scrollHeight);
        });

    // Verify the wallet page elements are present

    await expect(page.getByRole("button", { name: "Deposit" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Transfer" })).toBeVisible();

});

test("@wallet Verify elements present on wallet page", async ({ loggedin, page }) => {

    await expect(loggedin).toHaveURL(/wallet/);


    // Verify overview cards box present on wallet page

    const cardsTitle = await page.locator(".cards-title").allTextContents();

    expect(cardsTitle).toEqual(["Super", "Cards", "Towers","Player Tokens","Spaces"])
    
});
test("@wallet Verify user can click on the deposit button", async ({ loggedin, page }) => {

    await expect(loggedin).toHaveURL(/wallet/);
    await page.getByRole("button", { name: "Deposit" }).click();

    // Extract the text

    const depositText = await page.locator(".max-w-464-xl >.ls-5").innerText();

    console.log("Deposit Text: ", depositText);
    expect(depositText).toContain("Deposit");

    // Grab the XRP address and verify it is present
    const xrpAddress = await page.locator(".font-16-md-imp").first().innerText();
    console.log("XRP Address: ", xrpAddress);
    expect(xrpAddress).not.toBeNull();
})

test.only("@wallet Verify user click on transer button and lands on transfer page", async ({ loggedin, page }) => {

    await expect(loggedin).toHaveURL(/wallet/);
    await page.getByRole("button", { name: "Transfer" }).click();
    const transferText = await page.locator(".gotham-medium.font-40").innerText();
    console.log("Transfer Text: ", transferText);
    expect(transferText).toContain("Transfer");
})