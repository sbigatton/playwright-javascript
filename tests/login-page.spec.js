const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login');
const { Header} = require ('../pages/header');
const { ProductsPage } = require('../pages/products');
const account = require('../data/account.json');

test.describe('Login page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('should redirect the user to products page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(account.username, account.password);
        const header = new Header(page);
        const productsPage = new ProductsPage(page);
        expect(header.pageTitle).toHaveText(productsPage.title);
        expect(header.cartButton).toBeVisible();        
    });

    test('should display invalid credentials error', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.clickOnLoginButton();
        expect(loginPage.errorContainer).toHaveText('Epic sadface: Username is required');
        await loginPage.fillUserName(account.username);
        await loginPage.clickOnLoginButton();
        expect(loginPage.errorContainer).toHaveText('Epic sadface: Password is required');
        await loginPage.fillPassword('invalidPassword');
        await loginPage.clickOnLoginButton();
        expect(loginPage.errorContainer).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('should display an error navigating with user not logged in', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/inventory.html');        
        const loginPage = new LoginPage(page);        
        expect(loginPage.errorContainer).toHaveText('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
    });

    test('should redirect to login page on logout', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(account.username, account.password);
        const header = new Header(page);
        await header.openMenu();
        await header.logout();
        expect(loginPage.loginButton).toBeVisible();
    });
});