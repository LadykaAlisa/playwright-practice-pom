import { expect, type Locator, type Page } from '@playwright/test';
import { GaragePage } from '../pages/garagePage';

export class EditCarForm {
    readonly page: Page;
    readonly brand: Locator;
    readonly model: Locator;
    readonly mileage: Locator;
    readonly createdAtDate: Locator;
    readonly closeButton: Locator;
    readonly saveButton: Locator;
    readonly cancelButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.brand = page.getByLabel('Brand');
        this.model = page.getByLabel('Model');
        this.mileage = page.getByLabel('Mileage');
        this.createdAtDate = page.getByLabel('Created at date');
        this.closeButton = page.getByLabel('Close');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async open() {
        const garagePage = new GaragePage(this.page);
        await garagePage.editCarIcon.first().click();
    }

    async editWithoutError () {
        await this.mileage.click();
        await this.mileage.fill('8000');
        await this.saveButton.click(); 
    }

    async editWithLessMileageError () {
        await this.mileage.click();
        await this.mileage.fill('80');
        await this.saveButton.click(); 
    }

    async editWithEmptyMileageError () {
        await this.mileage.click();
        await this.mileage.fill('');
        await this.page.getByText('Remove carCancelSave').click(); 
    }
    }
