

class Register {


    constructor(page) {
        this.page = page;
        this.gender = page.locator("input[id='gender-male']")
        this.firstName = page.getByLabel("First name:");
        this.lastName = page.getByLabel("Last name:");
        this.email = page.getByLabel("Email").first()
        this.password = page.getByLabel("Password:").first()
        this.confirmPassword = page.getByLabel("Confirm password:").first()
        this.registerbutton = page.getByRole("button", { name: "Register" })

    }

    async selectGender() {
        await this.gender.check();
    }
    async fillFirstName(firstName) {
        await this.firstName.fill(firstName);
    }
    async fillLastName(lastName) {

        await this.lastName.fill(lastName);
    }

    async fillEmail(email) {
        await this.email.fill(email);
    }

    async gotoRegisterPage() {
        await this.page.goto("https://demowebshop.tricentis.com/register");
    }

    async fillpassword(password) {

        await this.password.fill(password);
    }

    async fillConfirmPassword(confirmPassword) {
        await this.confirmPassword.fill(confirmPassword);
    }

    async clickRegisterButton() {
        await this.registerbutton.click();
    }   

}

module.exports = Register;