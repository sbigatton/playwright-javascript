export class CartPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        this.page = page;
        this.title = 'Your Cart';
        this.productItem = page.locator('.cart_item');
        this.continueShoppingButton = page.getByText('Continue Shopping', { exact: true });
        this.checkOutButton = page.getByText('Checkout', { exact: true });
    }

    getProductItem(name){
        return this.page.locator('[data-test="inventory-item"]', { has: this.page.getByText(name) });        
    }

    async removeProduct(name) {
        await this.getProductItem(name).getByText('Remove', { exact: true }).click();
    }

    async goToProduct(name) {
        await this.productItem.locator('.inventory_item_name', { hasText: name }).click();
    }

    async checkout() {
        await this.checkOutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}