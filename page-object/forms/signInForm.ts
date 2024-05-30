import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderPage } from '../components/headerPage';

export class SignInForm {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessageBox: Locator;
    readonly formHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByLabel('Email');
        this.passwordField = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessageBox = page.locator('.alert-danger');
        this.formHeader = page.getByRole('heading', { name: 'Log in' });
    }

    async open() {
        const headerPage = new HeaderPage(this.page);
        await headerPage.clickSignInButton();
        await expect(this.formHeader).toBeVisible();

    }

    async loginWithCredentials(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}