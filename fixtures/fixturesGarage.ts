import { test as base } from '@playwright/test'
import { GaragePage } from '../page-object/pages/garagePage';
import { SignInForm } from '../page-object/forms/signInForm';
import { FuelExpenses } from '../page-object/forms/fuelExpensesForm';
import { EditCarForm } from '../page-object/forms/editCarForm';



export const test = base.extend({

    garagePageAsUser: async ({ page }, use) => {
        let garagePage = new GaragePage(page);
        await page.goto('/');
        await garagePage.login();
        await use(garagePage);
    },

    signInForm: async ({page}, use) => {
        let signInForm  = new SignInForm(page);
        await page.goto('/');
        await signInForm.open();
        await use(signInForm);
    },

    fuelExpenses: async ({page}, use) => {
        let fuelExpenses = new FuelExpenses(page);
        await page.goto('https://qauto.forstudy.space/panel/garage');
        await fuelExpenses.open();
        await use(fuelExpenses);
    },

    editCarForm: async ({page}, use) => {
        let editCarForm = new EditCarForm(page);
        await page.goto('https://qauto.forstudy.space/panel/garage');
        await editCarForm.open();
        await use(editCarForm);
    },

});

