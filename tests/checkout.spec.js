const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { Header } = require('../pages/header');
const { ProductsPage } = require('../pages/products');
const { CartPage } = require('../pages/cart');
const { CheckoutStepOnePage } = require('../pages/checkout-step-one');
const { CheckoutStepTwoPage } = require('../pages/checkout-step-two');
const { CheckoutCompletePage } = require('../pages/checkout-complete');
const products = require('../data/products.json');
const account = require('../data/account.json');

const productA = products.find(product => product.name === 'Sauce Labs Bike Light');
const productB = products.find(product => product.name === 'Sauce Labs Bolt T-Shirt');  

test.describe('Checkout information page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginPage = new LoginPage(page);
        await loginPage.login(account.username, account.password);
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        expect(header.pageTitle).toHaveText(productsPage.title);      
        await productsPage.addProductToCart(productA.name);
        await productsPage.addProductToCart(productB.name);
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
        expect(cartPage.getProductItem(productA.name)).toBeVisible();
        expect(cartPage.getProductItem(productB.name)).toBeVisible();
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

test.describe('Checkout overview page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginPage = new LoginPage(page);
        await loginPage.login(account.username, account.password);
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        expect(header.pageTitle).toHaveText(productsPage.title);      
        await productsPage.addProductToCart(productA.name);
        await productsPage.addProductToCart(productB.name);
        await header.goToCart();
        const cartPage = new CartPage(page);
        await cartPage.checkout();
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.fillFirstName('Jason');
        await checkoutStepOnePage.fillLastName('Born');
        await checkoutStepOnePage.fillZipCode('19019');
        await checkoutStepOnePage.continue();
    });

    test('should cancel and navigate back to products page', async ({ page }) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await checkoutStepTwoPage.cancel();
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        expect(header.pageTitle).toHaveText(productsPage.title);      
        expect(header.cartButtonCounter).toHaveText('2');
        expect(productsPage.getProductButton(productA.name)).toHaveText('Remove');
        expect(productsPage.getProductButton(productB.name)).toHaveText('Remove');
    });

    test('should display product details as expected', async ({ page }) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);

        // Sauce Labs Bike Light
        expect(checkoutStepTwoPage.getProductDescription(productA.name)).toHaveText(productA.description);
        expect(checkoutStepTwoPage.getProductPrice(productA.name)).toHaveText(`$${productA.price}`);
        expect(checkoutStepTwoPage.getProductQuantity(productA.name)).toHaveText('1');
        
        // Sauce Labs Bolt T-Shirt
        expect(checkoutStepTwoPage.getProductDescription(productB.name)).toHaveText(productB.description);
        expect(checkoutStepTwoPage.getProductPrice(productB.name)).toHaveText(`$${productB.price}`);
        expect(checkoutStepTwoPage.getProductQuantity(productB.name)).toHaveText('1');
    });

    test('should complete the order', async ({ page }) => {
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await checkoutStepTwoPage.finish();

        const header = new Header(page);
        const checkoutCompletePage = new CheckoutCompletePage(page);
        expect(header.pageTitle).toHaveText(checkoutCompletePage.title);
        expect(checkoutCompletePage.thankYouMsg).toBeVisible();
        expect(checkoutCompletePage.successImage).toBeVisible();
        expect(checkoutCompletePage.orderMsg).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });
});