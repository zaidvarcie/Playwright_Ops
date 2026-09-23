


const { test, expect } = require('@playwright/test')

test.describe("All Cases of ComputersCategory", async () => {


    test.describe.configure({ mode: 'serial' })

    test("@open Navigate to computers category", async ({ page }) => {

        await page.goto("https://demowebshop.tricentis.com/desktops")

        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
        //await page.evaluate(()=>window.scrollTo(0,document.body.scrollTop))
        await page.pause()
    })

    test("@dropdown Select dropdown high to low Price", async ({ page }) => {

        await page.goto("https://demowebshop.tricentis.com/desktops")
        await Promise.all([
            page.waitForEvent("domcontentloaded"),
            page.locator("#products-orderby").selectOption({ label: "Price: High to Low" })
        ])
        

    })
    test("@dropdown Select dropdown Created on", async ({ page }) => {

        await page.goto("https://demowebshop.tricentis.com/desktops")
        await Promise.all([
            page.waitForEvent("domcontentloaded"),
            page.locator("#products-orderby").selectOption({ label: "Created on" })
        ])

    })
    test("@view Display per page 4 records", async({page})=>{

        await page.goto("https://demowebshop.tricentis.com/desktops")
         await Promise.all([
            page.waitForEvent("domcontentloaded"),
            page.locator("#products-pagesize").selectOption({ label: "4" })  
            
        ])

        // // Verify Pagination
        await page.locator("li.next-page").isVisible()
        await page.locator("li.next-page").click()
        // Navigate to previous page
         await page.locator("li.next-page").isVisible()
        await page.locator("li.previous-page").click()
        await page.pause()

    })

    test("@filter Verify Products under 1000 range", async({page})=>{

        await page.goto("https://demowebshop.tricentis.com/desktops")
        

    })
})


