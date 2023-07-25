const page = require('../page');
const helper = require('../helper');

describe('Create an order', () => {
  it('complete the order process'), () => {

// enter the address for the order and validate each input field
    cy.visit('/')
    cy.get(page.fromField).click({ force: true }).type('East 2nd Street')
    cy.get(page.fromField).should('have.value', 'East 2nd Street')
    cy.get(page.toField).click({ force: true }).type('1300 1st St') 
    cy.get(page.toField).should('have.value', 'East 2nd Street')
    cy.get(page.toField).should('have.value', '1300 1st St')

// selects the default transport option (which is Fastest and Taxi as vehicle) and clicks the Call A Taxi Button also validating it was clicked
    cy.get(page.callATaxiButton).first().should('be.visible').click()
    cy.get('[class="tcard"]').contains('Sleepy').should('be.visible').click()

// selects the "Sleepy" option for the taxi vehicle model and validates it's there to click
    cy.get('[class="tcard"]').contains('Sleepy').should('be.visible').click()

// enters the payment information for the order and submits it and validate each input field
    cy.get('.pp-button').click()
    cy.get('.pp-selector > .disabled').click()
    cy.get('[id=number]').click().type('1234 0000 4321').should('have.value', '1234 0000 4321')
    cy.get('.card-code-input > #code').click().type('12').should('have.value', '12')
    cy.get('.plc').click()
    cy.get('.pp-buttons > [type="submit"]').click()
    cy.get('.payment-picker > .modal > .active > .close-button').click()
    cy.get('.payment-picker > .modal > .active > .close-button').should('not.have.class', 'active')

// adds a blanket and hankerchief to the order and validates it was selected
    cy.get('[id=comment]').click( { force: true} ).type('Please arrive 5 minutes early').should('have.value', 'Please arrive 5 minutes early')

// click submit button to submit the order and validates it was submitted
    cy.get('.smart-button').click()
    cy.get('.order-body').should('be.visible')
  }
})