describe('The Sign Page', function() {
  it('admin role works', function() {
    const email = Cypress.env('adminEmail')

    const password = Cypress.env('adminPassword')

    cy.visit('/')

    cy.get('#root > div > nav > div > div:nth-child(2) > a').click()

    cy.get('input[name=email]').type(email)

    cy.get('input[name=password]').type(`${password}{enter}`)

    cy.url().should('include', '/dashboard')

    cy.contains('Admin Link')
  })
})
