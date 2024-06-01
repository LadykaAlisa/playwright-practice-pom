import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturesGarage';

test.describe('Garage Page', () => {

  test.use({storageState:'./test-data/states/userOneState.json'});

test.describe('tests add and delete new car', () => {

  test('should open garage page', async ({garagePageAsUser}) => {
    await expect(garagePageAsUser.page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });

    test('should open empty garage page', async ({garagePageAsUser}) => {
      await expect(garagePageAsUser.page.getByText('You don’t have any cars in your garage')).toBeVisible();
      });

    test('should add a car', async ({garagePageAsUser}) => {
        await garagePageAsUser.addCar('Audi', 'TT', '2000');
        await expect(garagePageAsUser.page.getByText('Audi TT')).toBeVisible();
    });

     test('should delete a car', async ({garagePageAsUser}) => {
        await garagePageAsUser.deleteCar();
        await expect(garagePageAsUser.page.getByText('Car removed')).toBeVisible();
    });

})

test.describe('tests with added car', () => {
        test.beforeEach(async ({garagePageAsUser}) => {
            await garagePageAsUser.addCar('Ford', 'Focus', '7000');
        });
        test.afterEach(async ({ garagePageAsUser }) => {
          await garagePageAsUser.deleteLastCars();
      });

        test('should visible the car in the page', async ({garagePageAsUser}) => {
          await expect(garagePageAsUser.page.locator('div').filter({ hasText: /^Ford Focus$/ }).first()).toBeVisible();
        });

        test('car editing without error', async ({ editCarForm }) => {
            await editCarForm.editWithoutError();
            await expect(editCarForm.page.getByText('Car updated')).toBeVisible();
          });
          test('car editing with less mileage error', async ({ editCarForm }) => {
            await editCarForm.editWithLessMileageError();
            await expect(editCarForm.page.getByText('New mileage is less then')).toBeVisible();
            await editCarForm.closeButton.click();
          });

          test('car editing with empty mileage error', async ({ editCarForm }) => {
            await editCarForm.editWithEmptyMileageError();
            await expect(editCarForm.page.getByText('Mileage cost required')).toBeVisible();
            await editCarForm.closeButton.click();
          });

        test('should add fuel expence with total cost error', async ({ fuelExpenses }) => {
            await fuelExpenses.erorrTotalCost();
            await expect(fuelExpenses.page.getByText('First expense mileage must')).toBeVisible();
            await fuelExpenses.page.getByLabel('Close').click();
          });

        test('should add fuel expence without error', async ({ fuelExpenses }) => {
            await fuelExpenses.addFuelExpenses();
            await expect(fuelExpenses.page.getByRole('button', { name: 'Ford Focus' })).toBeVisible();
          });
    })
  })

  
