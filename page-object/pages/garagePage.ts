import { expect, type Locator, type Page } from '@playwright/test';
import { SignUpForm } from '../forms/signUpForm';
import { correctName, correctLastName, correctEmail, correctPassword, correctReEnterPassword } from '../../test-data/credentials';

export class GaragePage {
    readonly page: Page;
    readonly heading: Locator;
    readonly myProfileButton: Locator;
    readonly menuSettings: Locator;
    readonly removeAccountButton: Locator;
    readonly removeAccountFormButton: Locator;




    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Garage' });
        this.myProfileButton = page.getByRole('button', { name: 'User photo My profile' });
        this.menuSettings = page.getByRole('link', { name: 'Settings', exact: true });
        this.removeAccountButton = page.getByRole('button', { name: 'Remove my account' });
        this.removeAccountFormButton = page.getByRole('button', { name: 'Remove' });
    }

    async open() {
        const signUpForm = new SignUpForm(this.page);
        await signUpForm.open();
        await signUpForm.registerWithCredentials(correctName, correctLastName, correctEmail, correctPassword, correctReEnterPassword);
        await expect(this.page.locator('h1')).toHaveText('Garage');
    }

    async deleteNewUser() {
        await expect(this.heading).toBeVisible;
        await this.myProfileButton.click();
        await this.menuSettings.click();
        await this.removeAccountButton.click();
        await this.removeAccountFormButton.click();

    }
/*     async open() {
        const signUpnorm = new SignUpForm(this.page);
        await signUpForm.open();
        await signUpForm.registerWithCredentials(correctName, correctLastName, correctEmail, correctPassword, correctReEnterPassword);
        await expect(this.page.locator('h1')).toHaveText('Garage');
    } */

/*     async clickAddCarButton() {
        await this.addCarButton.click();
    }

    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption({ label: brand });
    }

    async selectModel(model: string) {
        await this.page.waitForTimeout(1000);
        await this.modelDropdown.selectOption({ label: model });
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async getFirstCarName() {
        return this.firstCarName;
    }

    async removeLastCar() {
        const carsNumberBefore = await this.page.locator('.icon-edit').count();
        await this.editCarIcon.click();
        await this.removeCarButton.click();
        await this.acceptCarRemovingButton.click();
        await expect(this.editCarIcon).toHaveCount(carsNumberBefore - 1);

    } */
}