const { ProductsPage } = require('./products');

export class CheckoutStepTwoPage extends ProductsPage {
    /**
     * @param {import('@playwright/test').Page} page     
     */

    constructor(page){
        super(page);
        this.page = page;
        this.title = 'Checkout: Overview';
        this.finishButton = page.getByText('Finish', { exact: true });
        this.cancelButton = page.getByText('Cancel', { exact: true });
    }

    async cancel() {
        await this.cancelButton.click();
    }

    async finish() {
        await this.finishButton.click();
    }
}