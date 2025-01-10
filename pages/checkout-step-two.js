export class CheckoutStepTwoPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        this.page = page;
        this.title = 'Checkout: Overview';
        this.productItem = page.locator('.cart_item');
        this.productName = page.locator('.inventory_item_name');
        this.productDescription = page.locator('inventory_item_desc');
        this.productPrice = page.locator('.inventory_item_price');
        this.finishButton = page.getByText('Finish', { exact: true });
        this.cancelButton = page.getByText('Cancel', { exact: true });
    }

    async goToProduct(name) {
        await this.productItem.locator('.inventory_item_name', { hasText: name }).click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    async finish() {
        await this.finishButton.click();
    }
}