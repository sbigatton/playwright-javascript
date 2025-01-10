export class ProductPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        this.page = page;
        this.title = 'Back to products';
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.productImage = page.locator('.inventory_details_img');
        this.productAddToCarButton = page.getByText('Add to cart', { exact: true });
        this.productRemoveFromButton = page.getByText('Remove', { exact: true });
    }

    async addProductToCart() {        
        await this.productAddToCarButton.click();
    }

    async removeProduct() {
        await this.removeProduct.click();
    }
}