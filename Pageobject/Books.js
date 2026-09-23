class Books {
    constructor(page) {
        this.page = page;

        this.productOrder = page.locator("#products-orderby");
        this.pageSize = page.locator("#products-pagesize");
        this.viewMode = page.locator("#products-viewmode");

        this.bookTitles = page.locator(".product-grid .product-item h2");
        this.productItems = page.locator(".item-box");
        this.displayLabels = page.locator(".product-page-size span");
        this.fictionBook = page.locator("h2 a[href$='/fiction']");
    }

    async goto() {
        await this.page.goto("https://demowebshop.tricentis.com/books");
    }

    async sortAToZ() {
        await Promise.all([
            this.page.waitForLoadState("domcontentloaded"),
            this.productOrder.selectOption({ label: "Name: A to Z" })
        ]);
    }

    async sortZToA() {
        await Promise.all([
            this.page.waitForLoadState("domcontentloaded"),
            this.productOrder.selectOption({ label: "Name: Z to A" })
        ]);
    }

    async sortByCreatedOn() {
        await Promise.all([
            this.page.waitForLoadState("domcontentloaded"),
            this.productOrder.selectOption({ label: "Created on" })
        ]);
    }

    async getBookTitles() {
        await this.bookTitles.first().waitFor();
        return await this.bookTitles.allTextContents();
    }
}

module.exports = { Books };