export class Header {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.title = 'Swag Labs';
        this.menu = page.locator('button#react-burger-menu-btn');
        this.headerLabel = page.locator('.header_label');
        this.cartButton = page.locator('[data-test="shopping-cart-link"]');
        this.cartButtonCounter = page.locator('[data-test="shopping-cart-badge"]');
        this.pageTitle = page.locator('[data-test="title"]');
        this.activeFilterOption = page.locator('[data-test="active-option"]');
        this.selectFilter = page.locator('[data-test="product-sort-container"]');
        this.backToProduct = page.locator('#back-to-products');
    }

    async selectFilterOption(option){
        await this.selectFilter.selectOption(option);
    }

    async goToCart(){
        await this.cartButton.click();
    }

    async goBackToProducts(){
        await this.backToProduct.click();
    }

    async openMenu(){
        await this.menu.click();
    }

    async logout(){
        await this.page.getByText('Logout').click();
    }

    getFilterOptions(){
        return this.selectFilter.locator('option');
    }
}