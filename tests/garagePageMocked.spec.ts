import { expect } from '@playwright/test';
import { test } from '../fixtures/fixturesGarage';

test.describe('Garage Page used mocked data', () => {

    test.use({storageState:'./test-data/states/userOneState.json'});

  test('test with replased username ', async ({ page }) => {

    await page.goto('/panel/profile');

    const response = {
        "status": "ok",
        "data": {
            "userId": 127888,
            "photoFilename": "default-user.png",
            "name": "Joe",
            "lastName": "Biden"
        }
    }
    await page.route('**/api/users/profile', route => route.fulfill({
        status: 200,
        body: JSON.stringify (response),
      }));

      await page.goto('/panel/profile');
      await expect(page.locator(".profile_name")).toHaveText('Joe Biden');
    });


})