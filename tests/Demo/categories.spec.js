

const { test, expect } = require("../../utils/login.js");

import { Categories } from "../../Pageobject/Categories.js";


test.describe.configure({ mode: "serial" });
test.describe("Verify homepage tabs", () => {

    let categories;

     test.beforeEach(async ({ loggedin }) => {
    categories = new Categories(loggedin);
    await categories.gotoHome();
  });


    test("Verify user gets logged in", async ({loggedin }) => {
        await expect(loggedin).toHaveTitle("Demo Web Shop");
    });

    test("Verify Books tab is clickable", async ({ loggedin }) => {
        await categories.books()
        await expect(loggedin).toHaveURL("https://demowebshop.tricentis.com/books");

    })
    test("Verify Computers tab is clickble",async ({loggedin})=>{

        await categories.computer()
        await expect(loggedin).toHaveURL("https://demowebshop.tricentis.com/computers")
    })

    test("Verify Electronics tab is clickable",async ({loggedin})=>{
        await categories.electronic()
        await expect(loggedin).toHaveURL("https://demowebshop.tricentis.com/electronics")
    })
    test("Verify apparel & shoes link clickable", async({loggedin})=>{

        await categories.apparel()
        await expect(loggedin).toHaveURL("https://demowebshop.tricentis.com/apparel-shoes")
    })
});


test.afterEach( async ({page}, testinfo)=>{

    if(testinfo.status==='failed')
        {

         await page.screenshot({path:`screenshots/${testinfo.title}.png`})

    }
}
)