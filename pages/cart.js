const { ProductsPage } = require('./products');

export class CartPage extends ProductsPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        super(page);
        this.page = page;
        this.title = 'Your Cart';
        this.continueShoppingButton = page.getByText('Continue Shopping', { exact: true });
        this.checkOutButton = page.getByText('Checkout', { exact: true });
    }

    async checkout() {
        await this.checkOutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}