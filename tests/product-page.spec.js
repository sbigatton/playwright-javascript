const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { Header } = require('../pages/header');
const { ProductsPage } = require('../pages/products');
const { ProductPage } = require('../pages/product');
const { Product } = require('../models/product');
const { Account } = require('../models/account');

const account = new Account();

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
        const product = new Product(
            'Sauce Labs Bike Light', 
            'A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.', 
            '$9.99', 
            '/static/media/bike-light-1200x1500.37c843b0.jpg'
        );        
        const productsPage = new ProductsPage(page);
        await productsPage.goToProduct(product.name);
        const productPage = new ProductPage(page);
        expect(productPage.productName).toHaveText(product.name);
        expect(productPage.productDescription).toHaveText(product.description);
        expect(productPage.productPrice).toHaveText(product.price);
        expect(productPage.productImage).toHaveAttribute('src', product.image);
        expect(productsPage.getProductButton(product.name)).toHaveText('Add to cart');
    });
});