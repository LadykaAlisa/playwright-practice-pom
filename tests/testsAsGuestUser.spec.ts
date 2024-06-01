import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturesGarage';

test.describe('Garage Page with guest mode using session storage', () => {

  test('should open garage page with guest user without data', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Guest log in').click();
    const data = await page.evaluate(() => window.sessionStorage.getItem('guestData'))??'';
         const object = JSON.parse(data);
         expect (object.cars).toHaveLength(0);
    });

    test('verify car mileage in session storage after car adding', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        await page.getByText('Add car').click();
        await page.locator('#addCarMileage').fill('20000');
        await page.waitForTimeout(1000);
        await page.getByText('Add', {exact: true }).click();
        await expect(page.locator('.car_name')).toBeVisible();

        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData'))??'';
        const object = JSON.parse(data);
        const firstCar = object.cars[0];
        await expect (firstCar.mileage).toBe(20000);
    });

    test('verify car model in session storage after car adding', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        await page.getByText('Add car').click();
        await page.locator('#addCarMileage').fill('20000');
        await page.waitForTimeout(1000);
        await page.getByText('Add', {exact: true }).click();
        await expect(page.locator('.car_name')).toBeVisible();

        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData'))??'';
        const object = JSON.parse(data);
        const firstCar = object.cars[0];
        await expect (firstCar.model).toBe('TT');
    });

    test('verify car brand in session storage after car adding', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        await page.getByText('Add car').click();
        await page.locator('#addCarMileage').fill('20000');
        await page.waitForTimeout(1000);
        await page.getByText('Add', {exact: true }).click();
        await expect(page.locator('.car_name')).toBeVisible();

        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData'))??'';
        const object = JSON.parse(data);
        const firstCar = object.cars[0];
        await expect (firstCar.brand).toBe('Audi');
    });

    test('test guest mode added three cars', async ({ page }) => {
        await page.goto('/');

        const data = {
            "expenses": [],
            "cars": [
                {
                    "id": 1,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 40000,
                    "updatedMileageAt": "2024-06-01T13:43:30.471Z",
                    "carCreatedAt": "2024-06-01T13:43:30.471Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 40000
                },
                {
                    "id": 2,
                    "brand": "Audi",
                    "model": "Q7",
                    "logo": "audi.png",
                    "initialMileage": 50000,
                    "updatedMileageAt": "2024-06-01T13:43:56.703Z",
                    "carCreatedAt": "2024-06-01T13:43:56.703Z",
                    "carBrandId": 1,
                    "carModelId": 3,
                    "mileage": 50000
                },
                {
                    "id": 3,
                    "brand": "Ford",
                    "model": "Fiesta",
                    "logo": "ford.png",
                    "initialMileage": 6000,
                    "updatedMileageAt": "2024-06-01T13:44:09.063Z",
                    "carCreatedAt": "2024-06-01T13:44:09.063Z",
                    "carBrandId": 3,
                    "carModelId": 11,
                    "mileage": 6000
                }
            ],
            "nextCarId": 4,
            "nextExpenseId": 1
        }

        await page.evaluate((object) => {
            window.sessionStorage.setItem('guestData', JSON.stringify(object))
        }, data);

        await page.getByText('Guest log in').click();
        expect (page.locator('.car_name').first()).toHaveText('Audi TT');
        expect (page.locator('.car_name').nth(1)).toHaveText('Audi Q7');
        expect (page.locator('.car_name').nth(2)).toHaveText('Ford Fiesta');
    });
})


