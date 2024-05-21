import { test, expect } from '@playwright/test';
import { SignUpForm } from '../page-object/forms/signUpForm';
import { correctName, correctLastName, correctEmail, correctPassword, correctReEnterPassword, incorrectName, incorrectLastName, incorrectEmail, incorrectPassword, incorrectReEnterPassword, incorrectNameLength, incorrectLastNameLength } from '../test-data/credentials';
import { emptyName, emptyLastName, emptyEmail, emptyPassword, emptyReEnterPassword } from '../utils/emptyInputs';
import { GaragePage } from '../page-object/pages/garagePage';


test.describe('Register tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  let signUpForm: SignUpForm;
  let garagePage: GaragePage;
  test.beforeEach( async ({page})=> {
    signUpForm = new SignUpForm(page);
    garagePage = new GaragePage(page);
  })

test.describe('Successful registration', () => {

  test('registration with correct credentials', async ({ page }) => {
    await signUpForm.open();
    await signUpForm.registerWithCredentials(correctName, correctLastName, correctEmail, correctPassword, correctReEnterPassword);
    await garagePage.deleteNewUser();
});
})

test.describe('Unsuccessful registration with empty input', () => {

  test('registration with empty name disabled button register', async ({ page }) => {
    await signUpForm.open();
    await signUpForm.registerWithErrorCredentials(emptyName, correctLastName, correctEmail, correctPassword, correctReEnterPassword);
    await signUpForm.registerButtonBeDisabled();
});

test('registration with empty name required error', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials( emptyName, correctLastName, correctEmail, correctPassword, correctReEnterPassword);
  await signUpForm.expectRequiredError();
});

test('registration with empty last name disabled button register', async ({ page }) => {

  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials( correctName, emptyLastName, correctEmail, correctPassword, correctReEnterPassword);
  await signUpForm.registerButtonBeDisabled();
});

test('registration with empty last name required error', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials( correctName, emptyLastName, correctEmail, correctPassword, correctReEnterPassword);
  await signUpForm.expectRequiredError();
});

test('registration with empty email disabled button register', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, correctLastName, emptyEmail, correctPassword, correctReEnterPassword);
  await signUpForm.registerButtonBeDisabled();
});

test('registration with empty email requred error', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, correctLastName, emptyEmail, correctPassword, correctReEnterPassword);
  await signUpForm.expectRequiredError();
});

test('registration with empty password disabled button register', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, correctLastName, correctEmail, emptyPassword, correctReEnterPassword);
  await signUpForm.registerButtonBeDisabled();
});

test('registration with empty password required error', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, correctLastName, correctEmail, emptyPassword, correctReEnterPassword);
  await signUpForm.expectRequiredError();
});

test('registration with empty re-enter password disabled button register', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, correctLastName, correctEmail, correctPassword, emptyReEnterPassword);
  await signUpForm.registerButtonBeDisabled();
});

test('registration with empty re-enter password required error', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, correctLastName, correctEmail, correctPassword, emptyReEnterPassword);
  await signUpForm.disabledRegisterButton.click();
  await signUpForm.expectRequiredError();
});
})

test.describe('Unsuccessful registration with invalid credentials', () => {

  test.beforeEach( async ({page})=> {
    await page.goto('/');
  })
  test('registration with invalid name', async ({ page }) => {
    await signUpForm.open();
    await signUpForm.registerWithErrorCredentials(incorrectName, correctLastName, correctEmail, correctPassword, correctReEnterPassword);
    await signUpForm.expectRedBorder();
});

test('registration with invalid last name', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, incorrectLastName, correctEmail, correctPassword, correctReEnterPassword);
  await signUpForm.expectRedBorder();
});

test('registration with invalid email', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, correctLastName, incorrectEmail, correctPassword, correctReEnterPassword);
  await signUpForm.expectRedBorder();
});

test('registration with invalid password', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, correctLastName, correctEmail, incorrectPassword, correctReEnterPassword);
  await expect(page.getByText('Password has to be from 8 to')).toBeVisible();
});

test('registration with invalid re-enter password', async ({ page }) => {
  await signUpForm.open();
  await signUpForm.registerWithErrorCredentials(correctName, correctLastName, correctEmail, correctPassword, incorrectReEnterPassword);
  await signUpForm.disabledRegisterButton.click();
  await expect(page.getByText('Passwords do not match')).toBeVisible();
});

test.describe('Unsuccessful registration with registration with character length error', () => {

  test('registration with character length error name', async ({ page }) => {
    await signUpForm.open();
    await signUpForm.registerWithErrorCredentials(incorrectNameLength, correctLastName, correctEmail, correctPassword, correctReEnterPassword);
    await signUpForm.expectLengthError();
  });

  test('registration with character length error last name', async ({ page }) => {
    await signUpForm.open();
    await signUpForm.registerWithErrorCredentials(correctName, incorrectLastNameLength, correctEmail, correctPassword, correctReEnterPassword);
    await signUpForm.expectLengthError();
  });

})
})
})