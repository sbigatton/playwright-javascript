const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { Header} = require ('../pages/header');
const { ProductsPage } = require('../pages/products');
const { ProductPage } = require('../pages/product');
const products = require('../data/products.json');
const account = require('../data/account.json');

const productNames = products.map(product => product.name);

test.describe('Products page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const loginPage = new LoginPage(page);
        await loginPage.login(account.username, account.password);
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        expect(header.pageTitle).toHaveText(productsPage.title);
    });

    test('should display expected list of products', async ({ page }) => {
        const productsPage = new ProductsPage(page);
        expect(productsPage.productName).toHaveText(productNames);
    });

    test('should display Sauce Labs Bike Light product details as expected', async ({ page }) => {
        const product = products.find(product => product.name === 'Sauce Labs Bike Light');
        const productsPage = new ProductsPage(page);
        expect(productsPage.getProductDescription(product.name)).toHaveText(product.description);
        expect(productsPage.getProductPrice(product.name)).toHaveText(`$${product.price}`);
        expect(productsPage.getProductImage(product.name)).toHaveAttribute('src', product.image);
        expect(productsPage.getProductButton(product.name)).toHaveText('Add to cart');
    });

    test('should add / remove items to cart and display correct count', async ({ page }) => {        
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        await productsPage.addProductToCart(productNames[1]);
        expect(header.cartButtonCounter).toHaveText('1');
        expect(productsPage.getProductButton(productNames[1])).toHaveText('Remove');
        await productsPage.addProductToCart(productNames[2]);
        expect(header.cartButtonCounter).toHaveText('2');
        expect(productsPage.getProductButton(productNames[2])).toHaveText('Remove');
        await productsPage.removeProduct(productNames[1]);
        expect(header.cartButtonCounter).toHaveText('1');
        expect(productsPage.getProductButton(productNames[1])).toHaveText('Add to cart');
    });

    test('should navigate to product detail and go back', async ({ page }) => {
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        const productPage = new ProductPage(page);
        await productsPage.goToProduct(productNames[1]);
        expect(header.backToProduct).toHaveText(productPage.title);
        expect(productPage.productName).toHaveText(productNames[1]);
        await header.goBackToProducts();
        expect(header.pageTitle).toHaveText(productsPage.title);
    });

    test('should sort products properly', async ({ page }) => {
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        
        expect(header.activeFilterOption).toHaveText('Name (A to Z)');
        const productNamesAtoZ = productNames.sort();
        expect(productsPage.productName).toHaveText(productNamesAtoZ);
        
        await header.selectFilterOption('Name (Z to A)');
        const productNamesZtoA = productNames.sort((a, b) => b.localeCompare(a));
        expect(productsPage.productName).toHaveText(productNamesZtoA);

        await header.selectFilterOption('Price (low to high)');
        const lowToHigh = products.sort((a, b) => a.price - b.price);
        const lowToHighProductNames = lowToHigh.map(product => product.name);
        expect(productsPage.productName).toHaveText(lowToHighProductNames);

        await header.selectFilterOption('Price (high to low)');
        const highToLow = products.sort((a, b) => b.price - a.price);
        const highToLowProductNames = highToLow.map(product => product.name);
        expect(productsPage.productName).toHaveText(highToLowProductNames);
    });
});