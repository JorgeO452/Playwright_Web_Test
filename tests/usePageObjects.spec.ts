import {test, expect} from '@playwright/test'
import {NavigationPage} from '../page-objects/navigationPage'
import {FormLayoutsPage} from '../page-objects/formLayoutsPage'

test.beforeEach(async({page}) => { 
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('Parametrized methods', async({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await onFormLayoutsPage.sumbitInLineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', true)
})