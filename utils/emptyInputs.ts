import { Page } from '@playwright/test';

export const emptyName = async function emptyNameFunction(page: Page) {
    const emptyNameField = page.locator('#signupName');
    await emptyNameField.click();
    return ''; 
}

export const emptyLastName = async function emptyLastNameFunction(page: Page) {
    const emptyLastNameField = page.locator('#signupLastName');
    await emptyLastNameField.click();
    return ''; 
}

export const emptyEmail = async function emptyEmailFunction(page: Page) {
    const emptyEmailField = page.getByLabel('Name');;
    await emptyEmailField.click();
    return ''; 
}

export const emptyPassword = async function emptyPasswordFunction(page: Page) {
    const emptyPasswordField = page.getByLabel('Password', { exact: true });
    await emptyPasswordField.click();
    return ''; 
}

export const emptyReEnterPassword = async function emptyReEnterPasswordFunction(page: Page) {
    const emptyReEnterPasswordField = page.getByLabel('Re-enter password');
    await emptyReEnterPasswordField.click();
    return ''; 
}

