describe('The Side Menu', function() {
  it('admin role lists Users', function() {
    const email = Cypress.env('adminEmail')

    const password = Cypress.env('adminPassword')

    cy.visit('/')
      .get('.MuiToolbar-root > .MuiButton-root > .MuiButton-label')
      .click()
      .get('input[name=email]')
      .type(email)
      .get('input[name=password]')
      .type(`${password}{enter}`)

    cy.url().should('include', '/dashboard')

    cy.contains('Admin Link')

    cy.get('.MuiSvgIcon-root').click()

    cy.get('.MuiListItemText-root > .MuiTypography-root')
      .contains(/^Users$/)
      .click()

    cy.contains('Group: admin')
  })
})
