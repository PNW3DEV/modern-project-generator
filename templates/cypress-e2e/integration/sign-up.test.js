// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />


describe('Sign Up Page Smoke/E2E Testing', () => {
  beforeEach(() => {
    Cypress.env('REACT_APP_API_HOST', 'http://localhost:4000')
  })
  xit('should redirect to the sign up page', () => {
    cy.visit('/')
    cy.get("[data-testid='sign-up-link']").click({ force: true})
    cy.wait(2000)
    cy.url().should('include', '/registration')
  })
  xit('should fill out the sign up form', () => {
    const first = 'A'
    const middle = 'Fake'
    const last = 'Name'
    const email = 'afakename@gmail.com'
    const phoneNumber = '9719987939'
    const dob = '08/09/1999'
    const ssn = '536439811'
    const pin = '5311'
    cy.get('input[name=firstName]').type(first)
    cy.get('input[name=middleName]').type(middle)
    cy.get('input[name=lastName]').type(last)
    cy.get('input[name=email]').type(email)
    cy.get('input[name=phoneNumber]').type(phoneNumber)
    cy.get('input[name=dob]').type(dob)
    cy.get('input[name=ssn]').type(ssn)
    cy.get('input[name=pin]').type(pin)
    cy.get("[data-testid='select-female']").click({ force: true})
    cy.get("input[name='language']").parent().click()
    cy.get("#menu-language > div.MuiPaper-root.MuiMenu-paper.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded > ul > li:nth-child(1)").click()

    cy.wait(2000)

    cy.get("[data-testid='sign-up-submit']").click({multiple: true, force: true})

    cy.wait(2000)

    //cy.url().should('include', '/dashboard')

  })
})
