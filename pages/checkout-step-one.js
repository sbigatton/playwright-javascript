const { ProductsPage } = require('./products');

export class CheckoutStepOnePage extends ProductsPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        super(page);
        this.page = page;
        this.title = 'Checkout: Your Information';
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.zipCode = page.locator('[data-test="postalCode"]');
        this.continueButton = page.getByText('Continue', { exact: true });
        this.cancelButton = page.getByText('Cancel', { exact: true });
        this.errorContainer = page.locator('.error-message-container');
    }

    async fillFirstName(firstName){
        await this.firstName.fill(firstName);
    }

    async fillLastName(lastName){
        await this.lastName.fill(lastName);
    }

    async fillZipCode(code){
        await this.zipCode.fill(code);
    }

    async continue() {
        await this.continueButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }
}