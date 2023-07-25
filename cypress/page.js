module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    cvvNumberField: '//div[starts-with(text(), "Code")]',
    // Buttons
    callATaxiButton: '[class="button round"]',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    paymentMethodButton: '//div[@class="pp-text"]',
    paymentType: '//div[starts-with(text(), "Card")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    linkButton: '.plc',
    link: '//button[starts-with(text(), "Link")]',
    phoneNumberModal: '.modal',
    cardNumberModal: '.modal',
    closePaymentWindow: '.payment-picker .section.active .close-button',
    tariffCards: '.tariff-cards',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    fillCardInfo: async function(cardNumber, cvv) {
        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.setValue(cardNumber);
        const codeField = await $(this.cvvNumberField);
        await codeField.setValue(cvv);
        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
    submitCardNumber: async function(cardNumber, cvv) {
        await this.fillCardInfo(cardNumber, cvv);
        await $(this.linkButton).click();
        await browser.pause(2000);
    }
};    