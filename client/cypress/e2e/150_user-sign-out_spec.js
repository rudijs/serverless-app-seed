describe('The Sign Out Page', function() {
  it('user sign out works', function() {
    const email = Cypress.env('userEmail')

    const password = Cypress.env('userPassword')

    cy.visit('/')

    cy.get('.MuiToolbar-root > .MuiButton-root > .MuiButton-label').click()

    cy.get('input[name=email]').type(email)

    cy.get('input[name=password]').type(`${password}{enter}`)

    // cy.url().should('include', '/dashboard')
    cy.location('pathname').should('eq', '/dashboard')

    cy.contains('Sign Out')

    cy.get('.MuiButton-label').click()

    cy.location('pathname').should('eq', '/')

    cy.contains('Home Page')
  })
})
