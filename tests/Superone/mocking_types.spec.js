

/*
Response mocking — route.fulfill()
URL change — modify request URL
Method change — PATCH → GET/POST
Headers change
Request body change
Abort request — network failure
Delay response — slow API
Modify real response — route.fetch()
*/


await page.route(
    "**/writer/v2/user/email/initiatelogin",
    async (route) => {

        await route.continue({
            url: "https://quickdev1.super.one/writer/v2/user/email/wrongendpoint"
        });
    }
);


await page.route(
    "**/writer/v2/user/email/initiatelogin",
    async (route) => {

        await route.continue({
            method: "GET"
        });
    }
);

await page.route(
    "**/writer/v2/user/email/initiatelogin",
    async (route) => {

        const headers = {
            ...route.request().headers(),
            "Device-Type": "mobile"
        };

        await route.continue({
            headers: headers
        });
    }
);