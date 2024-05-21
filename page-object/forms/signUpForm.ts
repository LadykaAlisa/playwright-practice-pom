import { expect, type Locator, type Page } from '@playwright/test';
import { MainPage } from '../components/mainPage';

export class SignUpForm {
    readonly page: Page;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly reEnterPasswordField: Locator;
    readonly registerButton: Locator;
    readonly disabledRegisterButton : Locator;
    readonly errorMessageBox: Locator;
    readonly emptyErrorMessage: Locator;
    readonly lengthError: Locator;
    readonly formHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.getByLabel('Name');
        this.passwordField = page.getByLabel('Password', { exact: true });
        this.reEnterPasswordField = page.getByLabel('Re-enter password');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.disabledRegisterButton = page.locator('div').filter({ hasText: /^Register$/ })
        this.errorMessageBox = page.locator('.is-invalid');
        this.emptyErrorMessage = page.getByText('required');
        this.lengthError = page.getByText('has to be from 2 to 20');
        this.formHeader = (page.getByRole('heading', { name: 'Registration' }));
    }

    async open() {
        const mainPage = new MainPage(this.page);
        await mainPage.clickSignUpButton();
        await expect(this.formHeader).toBeVisible();

    }

    async registerWithCredentials(name: string, lastName: string,  email: string, password: string, reEnterPassword: string, ) {
        await this.nameField.fill(name);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.reEnterPasswordField.fill(reEnterPassword);
        await this.registerButton.click(); 
 }

async emptyName() {
    await this.nameField.click();
 } 

async registerButtonBeDisabled() {
    await expect(this.registerButton).toBeDisabled();
   }

async registerWithErrorCredentials(name: string | ((page: Page) => Promise<string>), lastName: string | ((page: Page) => Promise<string>), email: string | ((page: Page) => Promise<string>), password: string | ((page: Page) => Promise<string>), reEnterPassword: string | ((page: Page) => Promise<string>), ) {
    const resolvedName = typeof name === 'function' ? await name(this.page) : name;
    await this.nameField.fill(resolvedName);
    const resolvedLastName = typeof lastName === 'function' ? await lastName(this.page) : lastName;
    await this.lastNameField.fill(resolvedLastName);
    const resolvedEmail = typeof email === 'function' ? await email(this.page) : email;
    await this.emailField.fill(resolvedEmail);
    const resolvedPassword = typeof password === 'function' ? await password(this.page) : password;
    await this.passwordField.fill(resolvedPassword);
    const resolvedReEnterPassword = typeof reEnterPassword === 'function' ? await reEnterPassword(this.page) : reEnterPassword;
    await this.reEnterPasswordField.fill(resolvedReEnterPassword);
    await this.registerButtonBeDisabled() 
}

async expectRequiredError() {
    await expect(this.emptyErrorMessage).toBeVisible();
}

async expectRedBorder () {
    await expect(this.errorMessageBox).toHaveCSS('border-color' , "rgb(220, 53, 69)");
}

async expectLengthError() {
    await this.disabledRegisterButton.click();
    await expect(this.lengthError).toBeVisible();
}

}

