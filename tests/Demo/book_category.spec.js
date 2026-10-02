const { test, expect } = require("@playwright/test");
const { Books } = require("../../Pageobject/Books");

test.describe("Books Module", () => {

    test.describe.configure({ mode: "serial" });

    test("@open Navigate to Books page", async ({ page }) => {

        const books = new Books(page);

        await books.goto();
        await books.sortAToZ();

        const titles = await books.getBookTitles();

        console.log(titles);
    });

    test("Sort A-Z", async ({ page }) => {

        const books = new Books(page);

        await books.goto();
        await books.sortAToZ();

        const titles = await books.getBookTitles();

        titles.forEach(title => console.log(title));
    });

    test("Sort Z-A", async ({ page }) => {

        const books = new Books(page);

        await books.goto();
        await books.sortZToA();

        const titles = await books.getBookTitles();

        expect(titles[titles.length - 1]).toContain("Computing and Internet");
    });

    test("Sort by Created On", async ({ page }) => {

        const books = new Books(page);

        await books.goto();
        await books.sortByCreatedOn();

        await expect(books.fictionBook).toHaveText("Fiction");
    });

    test("Display 4 products", async ({ page }) => {

        const books = new Books(page);

        await books.goto();

        expect(await books.getDisplayLabel()).toContain("Display");
        expect(await books.getPerPageLabel()).toContain("per page");

        await books.selectPageSize(4);

        await expect(books.productItems).toHaveCount(4);
    });

    test("Display 8 products", async ({ page }) => {

        const books = new Books(page);

        await books.goto();

        await books.selectPageSize(8);

        expect(await books.getDisplayedProductsCount()).toBeGreaterThan(4);
    });

    test("Change View Mode", async ({ page }) => {

        const books = new Books(page);

        await books.goto();

        await books.selectViewMode("List");
    });

    // New Test case is added to verify the book category filter functionality
    test("Filter by Book Category", async ({ page }) => {

        const books = new Books(page); 
        await books.goto();

        await books.selectBookCategory("Computing and Internet");
    }) 


});