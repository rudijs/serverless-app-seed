describe('The Side Menu', function() {
  it('user role does not list Users', function() {
    const email = Cypress.env('userEmail')

    const password = Cypress.env('userPassword')

    cy.visit('/')
      .get('.MuiToolbar-root > .MuiButton-root > .MuiButton-label')
      .click()
      .get('input[name=email]')
      .type(email)
      .get('input[name=password]')
      .type(`${password}{enter}`)

    cy.url().should('include', '/dashboard')

    cy.get('.MuiSvgIcon-root').click()

    cy.get('.MuiListItemText-root > .MuiTypography-root')
      .contains(/^Users$/)
      .should('not.exist')
  })
})
