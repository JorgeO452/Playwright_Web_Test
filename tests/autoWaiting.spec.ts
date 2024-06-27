import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => { 
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('Auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    const text = await successButton.textContent()
    expect(text).toEqual('Data loaded with AJAX get request.')

    //----------------------------------------------------------------
    await successButton.waitFor({state: 'attached'})
    const text2 = await successButton.allTextContents()
    expect(text2).toContain('Data loaded with AJAX get request.')

    //----------------------------------------------------------------
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('Alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')

    //___ Wait for element
    //await page.waitForSelector('.bg-success')

    //___ Wait for particular response
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___ Wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('Timeout', async ({page}) => {
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()
})