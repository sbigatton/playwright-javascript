export class LoginPage {
    
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.userName = page.locator('[data-test="username"]');
        this.password = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorContainer = page.locator('[data-test="error"]');        
    }

    async login(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async fillUserName(userName){
        await this.userName.fill(userName);
    }

    async fillPassword(password){
        await this.password.fill(password);
    }

    async clickOnLoginButton(){
        await this.loginButton.click();
    }   
}