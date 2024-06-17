const { expect } = require("chai")

describe('Verify Contact page and Submit button functionality', () => {
    
    it('User goes to contact page and clicks the submit button', () => {
      cy.visit('http://jupiter.cloud.planittesting.com')
      cy.contains('Contact').click()
      cy.url().should('include','/#/contact')
      cy.contains('Submit').click()

      //Verify the error message on the Required fields
      cy.contains('Forename is required').should('exist')
      cy.contains('Email is required').should('exist')
      cy.contains('Message is required').should('exist')

      //Populate the required fields
      cy.get('[id=forename]').type('Test Automation')
      cy.get('[id=email]').type('notan@email.com')
      cy.get('[id=message]').type('This is an automaiton test message')

      //Verify that the error messages are gone
      cy.contains('Forename is required').should('not.exist')
      cy.contains('Email is required').should('not.exist')
      cy.contains('Message is required').should('not.exist')      
    })

    it('User goes to contact page, populate the fields and clicks the Submit button', () => {
      cy.visit('http://jupiter.cloud.planittesting.com')
      cy.contains('Contact').click()
      cy.url().should('include','/#/contact')


      //Populate the required fields
      cy.get('[id=forename]').type('Test Automation')
      cy.get('[id=email]').type('notan@email.com')
      cy.get('[id=message]').type('This is an automaiton test message')

      //clicks the submit button
      cy.contains('Submit').click()

      //Validate the Success message
      cy.get('[class="alert alert-success"]', { timeout: 30000 }).should('exist')
    })




  })