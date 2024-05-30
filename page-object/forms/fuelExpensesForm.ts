import { expect, type Locator, type Page } from '@playwright/test';
import { GaragePage } from '../pages/garagePage';

export class FuelExpenses {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly emptyGarageMessage: Locator;
    readonly vehicle: Locator;
    readonly reportDate: Locator;
    readonly mileage: Locator;
    readonly numbersOrLiters: Locator;
    readonly totalCost: Locator;
    readonly addButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.locator('h1', { hasText: 'Fuel expenses' })
        this.emptyGarageMessage = page.locator('.panel-empty_message');
        this.vehicle = page.getByLabel('Vehicle');
        this.reportDate = page.getByLabel('Report date');
        this.mileage = page.getByLabel('Mileage');
        this.numbersOrLiters = page.getByText('Number of liters');
        this.totalCost = page.getByLabel('Total cost');
        this.addButton = page.getByRole('button', { name: 'Add' });
    }

    async open() {
        const garagePage = new GaragePage(this.page);
        await garagePage.addFuelExpenceButton.first().click();
    }

    async erorrTotalCost() {
        await this.numbersOrLiters.click();
        await this.numbersOrLiters.fill('50');
        await this.mileage.click();
        await this.mileage.fill('5000');
        await this.totalCost.click();
        await this.totalCost.fill('1900');
        await this.addButton.click();
    }

    async addFuelExpenses() {
        await this.numbersOrLiters.click();
        await this.numbersOrLiters.fill('50');
        await this.mileage.click();
        await this.mileage.fill('10000');
        await this.totalCost.click();
        await this.totalCost.fill('1900');
        await this.addButton.click();
    }

}