

const {expect} = require("@playwright/test");

 
 
 class Homepage
{

    constructor(page)
    {
        this.page = page;
        this.tabs = page.locator("menu-primary-items");
    }


async  openHomePage()
{
    return this.page.goto("https://practicetestautomation.com/");

}
async  home()
{
    await this.tabs.filter({hasText: "Home"}).click();
}

}

module.exports = Homepage;



