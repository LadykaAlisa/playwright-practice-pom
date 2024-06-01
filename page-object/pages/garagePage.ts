import { expect, type Locator, type Page } from '@playwright/test';
import { SignUpForm } from '../forms/signUpForm';
import { correctName, correctLastName, correctEmail, correctPassword, correctReEnterPassword, loginEmail, loginPassword } from '../../test-data/credentials';
import { SignInForm } from '../forms/signInForm';

export class GaragePage {
    readonly page: Page;
    readonly heading: Locator;
    readonly myProfileButton: Locator;
    readonly menuSettings: Locator;
    readonly removeAccountButton: Locator;
    readonly removeAccountFormButton: Locator;
    readonly addCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly addButton: Locator;
    readonly editCarIcon: Locator;
    readonly editCarIconFirst: Locator;
    readonly removeCarButton: Locator;
    readonly acceptCarRemovingButton: Locator;
    readonly addFuelExpenceButton: Locator;
    readonly mileageInput: Locator;
    readonly mileageUpdateButton: Locator;
    readonly carItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Garage' });
        this.myProfileButton = page.getByRole('button', { name: 'User photo My profile' });
        this.menuSettings = page.getByRole('link', { name: 'Settings', exact: true });
        this.removeAccountButton = page.getByRole('button', { name: 'Remove my account' });
        this.removeAccountFormButton = page.getByRole('button', { name: 'Remove' });
        this.addCarButton = page.getByText('Add car');
        this.brandDropdown = page.locator('#addCarBrand');
        this.modelDropdown = page.locator('#addCarModel');
        this.mileageField = page.locator('#addCarMileage');
        this.addButton = page.getByText('Add', { exact: true });
        this.editCarIconFirst = page.locator('.icon-edit').first();
        this.editCarIcon = page.locator('.icon-edit');
        this.removeCarButton = page.locator('.btn-outline-danger');
        this.acceptCarRemovingButton = page.locator('.btn-danger');
        this.addFuelExpenceButton = page.getByRole('button', { name: 'Add fuel expense' });
        this.carItem = page.locator('.car jumbotron');
    }

    async open() {
        const signUpForm = new SignUpForm(this.page);
        await signUpForm.open();
        await signUpForm.registerWithCredentials(correctName, correctLastName, correctEmail, correctPassword, correctReEnterPassword);
        await expect(this.page.locator('h1')).toHaveText('Garage');
    }

    async login() {
        await this.page.goto('https://qauto.forstudy.space/panel/garage');
    }

    async loginAsUser() {
        const signInForm = new SignInForm(this.page);
        await signInForm.open();
        await signInForm.loginWithCredentials(loginEmail, loginPassword);
        await expect(this.page.locator('h1')).toHaveText('Garage');
    }

    async deleteNewUser() {
        await expect(this.heading).toBeVisible;
        await this.myProfileButton.click();
        await this.menuSettings.click();
        await this.removeAccountButton.click();
        await this.removeAccountFormButton.click();

    }

    async addCar(brand: string, model: string, mileage: string) {
        await this.addCarButton.click();
        await this.brandDropdown.selectOption({ label: brand });
        await this.modelDropdown.selectOption({ label: model });
        await this.mileageField.fill(mileage);
        await this.addButton.click();
    }


    async deleteCar() {
        await this.editCarIconFirst.click();
        await this.removeCarButton.click();
        await this.acceptCarRemovingButton.click();
        await expect(this.page.getByText('Car removed')).toBeVisible();
    }

    async deleteLastCars() {
        await this.page.goto('https://qauto.forstudy.space/panel/garage');
        const carsNumberBefore = this.editCarIcon.count();
        await this.editCarIconFirst.click();
        await this.removeCarButton.click();
        await this.acceptCarRemovingButton.click();
        await expect(this.page.getByText('Car removed')).toBeVisible();
    }
    }
