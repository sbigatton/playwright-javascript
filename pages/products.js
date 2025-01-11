const { ProductPage } = require('./product');

export class ProductsPage extends ProductPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        super(page);
        this.page = page;
        this.title = 'Products';
        this.productsImageSelector = 'img.inventory_item_img';        
    }

    getProductItem(name){
        return this.page.locator(this.productItemSelector, { has: this.page.getByText(name) });        
    }

    getProductDescription(name){
         return this.getProductItem(name).locator(this.productDescriptionSelector);
    }

    getProductPrice(name){
        return this.getProductItem(name).locator(this.productPriceSelector);
    }

    getProductImage(name){
        return this.getProductItem(name).locator(this.productsImageSelector);
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