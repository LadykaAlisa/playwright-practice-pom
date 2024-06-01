import { expect, test } from '@playwright/test'
import { GaragePage } from '../../page-object/pages/garagePage';

test.describe('Login and save state', () => {
    let garagePage :GaragePage;

test(" Login with User1 and save state" , async ({ page }) => {
        garagePage = new GaragePage(page);
        await page.goto('/');
        await garagePage.loginAsUser();
        await page.context().storageState({
            path: './test-data/states/userOneState.json'
        });
    })
})
