export class CheckoutStepOnePage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        this.page = page;
        this.title = 'Checkout: Your Information';
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.lastName = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByText('Continue', { exact: true });
        this.cancelButton = page.getByText('Cancel', { exact: true });
        this.errorContainer = page.locator('.error-message-container');
    }

    async removeProduct(name) {
        const product = this.productItem.filter({ has: this.page.locator('.inventory_item_name', { hasText: name }) });
        await product.getByText('Remove', { exact: true }).click();
    }

    async goToProduct(name) {
        await this.productItem.locator('.inventory_item_name', { hasText: name }).click();
    }

    async continue() {
        await this.checkOutButton.click();
    }

    async cancel() {
        await this.continueShoppingButton.click();
    }
}