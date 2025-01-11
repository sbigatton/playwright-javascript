export class ProductPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        this.page = page;
        this.title = 'Back to products';
        this.productItemSelector = '[data-test="inventory-item"]';
        this.productNameSelector = '[data-test="inventory-item-name"]';
        this.productDescriptionSelector = '[data-test="inventory-item-desc"]';
        this.productPriceSelector = '[data-test="inventory-item-price"]';
        this.productImageSelector = 'img.inventory_details_img';
        this.productItem = page.locator(this.productItemSelector);
        this.productName = page.locator(this.productNameSelector);        
        this.productDescription = page.locator(this.productDescriptionSelector);
        this.productPrice = page.locator(this.productPriceSelector);
        this.productImage = page.locator(this.productImageSelector);
        this.productAddToCarButton = page.getByText('Add to cart', { exact: true });
        this.productRemoveFromButton = page.getByText('Remove', { exact: true });
    }

    async addProductToCart() {        
        await this.productAddToCarButton.click();
    }

    async removeProduct() {
        await this.productRemoveFromButton.click();
    }
}