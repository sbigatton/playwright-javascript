const { ProductsPage } = require('./products');

export class CheckoutStepOnePage extends ProductsPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        super(page);
        this.page = page;
        this.title = 'Checkout: Your Information';
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.lastName = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByText('Continue', { exact: true });
        this.cancelButton = page.getByText('Cancel', { exact: true });
        this.errorContainer = page.locator('.error-message-container');
    }

    async continue() {
        await this.checkOutButton.click();
    }

    async cancel() {
        await this.continueShoppingButton.click();
    }
}