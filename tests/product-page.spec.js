const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { Header } = require('../pages/header');
const { ProductsPage } = require('../pages/products');
const { ProductPage } = require('../pages/product');
const products = require('../data/products.json');
const account = require('../data/account.json');

test.describe('Product page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginPage = new LoginPage(page);
        await loginPage.login(account.username, account.password);
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        expect(header.pageTitle).toHaveText(productsPage.title);
    });

    test('should display Sauce Labs Bike Light product details as expected', async ({ page }) => {
        const product = products.find(product => product.name === 'Sauce Labs Bike Light');        
        const productsPage = new ProductsPage(page);
        await productsPage.goToProduct(product.name);
        const productPage = new ProductPage(page);
        expect(productPage.productName).toHaveText(product.name);
        expect(productPage.productDescription).toHaveText(product.description);
        expect(productPage.productPrice).toHaveText(`$${product.price}`);
        expect(productPage.productImage).toHaveAttribute('src', product.image);
        expect(productsPage.getProductButton(product.name)).toHaveText('Add to cart');
    });
});