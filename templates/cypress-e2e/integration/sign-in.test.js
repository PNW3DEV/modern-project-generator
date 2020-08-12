// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('Sign In Page Smoke/E2E Testing', () => {
  beforeEach(() => {
    Cypress.env('REACT_APP_API_HOST', 'http://localhost:4000')
  })
  xit('should redirect to the user account page upon successful login', () => {
    const ssn = 'testemail@domain.com'
    const pin = 'Password123!' // get from environment variable or mock auth call
    cy.visit('/')
    cy.get('input[name=email]').type(ssn)
    cy.get('input[name=password]').type(pin)
    cy.get("[data-testid='sign-in-button']").click({ force: true})
    cy.wait(2000)
    cy.url().should('include', '/dashboard')
  })
})
