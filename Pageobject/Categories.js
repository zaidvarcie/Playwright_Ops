



class Categories {
    constructor(page) {
        this.page = page;
        this.booksLink = page.getByRole('link', { name: 'Books' })
        this.computers = page.getByRole('link', { name: 'Computers' })
        this.electronics = page.getByRole('link', { name: 'Electronics' })
        this.shoes = page.getByRole('link', {name: 'Apparel & Shoes'})
        this.digital = page.getByRole('link', {name:'Digital downloads'})

    }


    async books() {
        await this.booksLink.first().click()
    }
    async computer() {
        await this.computers.first().click()
    }
    async electronic() {
        await this.electronics.first().click()
    }

    async apparel()
    {
        this.shoes.first().click()
    }

    async digitals()
    {
        this.digital.first().click()
    }

    async gotoHome() {
        await this.page.goto('https://demowebshop.tricentis.com/');
    }




}
module.exports = { Categories }