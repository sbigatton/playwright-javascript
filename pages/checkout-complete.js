export class CheckoutComplete {
    /**
     * @param {import('@playwright/test').Page } page
     */

    constructor(page) {
        page = page;
        this.title = 'Checkout: Complete!';
        this.successImage = page.locator('.pony_express');
        this.thankYouMsg = page.locator('.complete-header');
        this.orderMsg = page.locator('.complete-text');
        this.backHomeButton = page.getByText('Back Home', { exact: true });
    }

    async backHome() {
        await this.backHomeButton.click();    
    }
}