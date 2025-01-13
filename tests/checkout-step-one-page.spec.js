const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { Header } = require('../pages/header');
const { ProductsPage } = require('../pages/products');
const { ProductPage } = require('../pages/product');
const { CartPage } = require('../pages/cart');
const { CheckoutStepOnePage } = require('../pages/checkout-step-one');
const { CheckoutStepTwoPage } = require('../pages/checkout-step-two');
const products = require('../data/products.json');
const account = require('../data/account.json');

const product = products.find(product => product.name === 'Sauce Labs Bike Light');

test.describe('Cart page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginPage = new LoginPage(page);
        await loginPage.login(account.username, account.password);
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        expect(header.pageTitle).toHaveText(productsPage.title);      
        await productsPage.addProductToCart(product.name);
        await header.goToCart();
        const cartPage = new CartPage(page);
        await cartPage.checkout();
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        expect(header.pageTitle).toHaveText(checkoutStepOnePage.title);
    });

    test('should display information field validation messages', async ({ page }) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.continue();
        expect(checkoutStepOnePage.errorContainer).toHaveText('Error: First Name is required');
        await checkoutStepOnePage.fillFirstName('Jason');
        await checkoutStepOnePage.continue();
        expect(checkoutStepOnePage.errorContainer).toHaveText('Error: Last Name is required');
        await checkoutStepOnePage.fillLastName('Born');
        await checkoutStepOnePage.continue();
        expect(checkoutStepOnePage.errorContainer).toHaveText('Error: Postal Code is required');
    });

    test('should cancel and navigate back to cart page', async ({ page }) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.cancel();
        const header = new Header(page);
        const cartPage = new CartPage(page);
        expect(header.pageTitle).toHaveText(cartPage.title);
        expect(cartPage.getProductItem(product.name)).toBeVisible();
    });

    test('should continue to finish checkout', async ({ page }) => {
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.fillFirstName('Jason');
        await checkoutStepOnePage.fillLastName('Born');
        await checkoutStepOnePage.fillZipCode('19019');
        await checkoutStepOnePage.continue();
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        const header = new Header(page);
        expect(header.pageTitle).toHaveText(checkoutStepTwoPage.title);
    });
});