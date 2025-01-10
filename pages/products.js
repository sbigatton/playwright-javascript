export class ProductsPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        this.page = page;
        this.title = 'Products';
        this.productNameSelector = '[data-test="inventory-item-name"]';
        this.productItem = page.locator('[data-test="inventory-item"]');
        this.productName = page.locator(this.productNameSelector);
        this.productAddToCarButton = page.getByText('Add to cart', { exact: true });
    }

    getProductItem(name){
        return this.page.locator('[data-test="inventory-item"]', { has: this.page.getByText(name) });        
    }

    getProductDescription(name){
         return this.getProductItem(name).locator('[data-test="inventory-item-desc"]');
    }

    getProductPrice(name){
        return this.getProductItem(name).locator('[data-test="inventory-item-price"]');
    }

    getProductImage(name){
        return this.getProductItem(name).locator('.inventory_item_img img');
    }

    getProductButton(name){
        return this.getProductItem(name).locator('button');
    }

    async addProductToCart(name) {
        await this.getProductItem(name).getByText('Add to cart', { exact: true }).click();
    }

    async removeProduct(name) {
        await this.getProductItem(name).getByText('Remove', { exact: true }).click();
    }

    async goToProduct(name) {
        await this.productItem.locator(this.productNameSelector, { hasText: name }).click();
    }
}