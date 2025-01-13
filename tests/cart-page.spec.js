const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { Header } = require('../pages/header');
const { ProductsPage } = require('../pages/products');
const { ProductPage } = require('../pages/product');
const { CartPage } = require('../pages/cart');
const { CheckoutStepOnePage } = require('../pages/checkout-step-one');
const products = require('../data/products.json');
const account = require('../data/account.json');

const productA = products.find(product => product.name === 'Sauce Labs Bike Light');
const productB = products.find(product => product.name === 'Sauce Labs Bolt T-Shirt');  

test.describe('Cart page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginPage = new LoginPage(page);
        await loginPage.login(account.username, account.password);
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        expect(header.pageTitle).toHaveText(productsPage.title);      
        await productsPage.addProductToCart(productA.name);
        await productsPage.addProductToCart(productB.name);
        await expect(header.cartButtonCounter).toHaveText('2');
    });

    test('should display added products as expected', async ({ page }) => {
        const header = new Header(page);
        await header.goToCart();
        const cartPage = new CartPage(page);
        expect(header.pageTitle).toHaveText(cartPage.title);

        // Sauce Labs Bike Light
        expect(cartPage.getProductDescription(productA.name)).toHaveText(productA.description);
        expect(cartPage.getProductPrice(productA.name)).toHaveText(`$${productA.price}`);
        expect(cartPage.getProductQuantity(productA.name)).toHaveText('1');
        expect(cartPage.getProductButton(productA.name)).toHaveText('Remove');
        
        // Sauce Labs Bolt T-Shirt
        expect(cartPage.getProductDescription(productB.name)).toHaveText(productB.description);
        expect(cartPage.getProductPrice(productB.name)).toHaveText(`$${productB.price}`);
        expect(cartPage.getProductQuantity(productB.name)).toHaveText('1');
        expect(cartPage.getProductButton(productB.name)).toHaveText('Remove');
    });

    test('should remove products', async ({ page }) => {
        const header = new Header(page);
        await header.goToCart();
        const cartPage = new CartPage(page);
        expect(header.pageTitle).toHaveText(cartPage.title);

        await cartPage.removeProduct(productA.name);
        expect(cartPage.getProductItem(productA.name)).toBeHidden();
        
        expect(cartPage.getProductDescription(productB.name)).toHaveText(productB.description);
        expect(cartPage.getProductPrice(productB.name)).toHaveText(`$${productB.price}`);
        expect(cartPage.getProductQuantity(productB.name)).toHaveText('1');
        expect(cartPage.getProductButton(productB.name)).toHaveText('Remove');

        await expect(header.cartButtonCounter).toHaveText('1');
    });

    test('should continue shopping', async ({ page }) => {
        const header = new Header(page);
        await header.goToCart();
        const cartPage = new CartPage(page);
        expect(header.pageTitle).toHaveText(cartPage.title);

        await cartPage.continueShopping();
        const productsPage = new ProductsPage(page);
        expect(header.pageTitle).toHaveText(productsPage.title);
    });

    test('should navigate to product', async ({ page }) => {
        const header = new Header(page);
        await header.goToCart();
        const cartPage = new CartPage(page);
        expect(header.pageTitle).toHaveText(cartPage.title);

        await cartPage.goToProduct(productA.name);
        const productPage = new ProductPage(page);
        expect(header.backToProduct).toBeVisible();
        expect(productPage.productName).toHaveText(productA.name);
        expect(productPage.productRemoveFromButton).toHaveText('Remove');
    });

    test('should checkout', async ({ page }) => {
        const header = new Header(page);
        await header.goToCart();
        const cartPage = new CartPage(page);
        expect(header.pageTitle).toHaveText(cartPage.title);
        
        await cartPage.checkout();
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        expect(header.pageTitle).toHaveText(checkoutStepOnePage.title);
    });
});