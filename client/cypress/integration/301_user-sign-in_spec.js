describe("The Sign Page", function() {
  it("user role works", function() {
    const email = Cypress.env("userEmail");

    const password = Cypress.env("userPassword");

    cy.visit("/");

    cy.get("#root > div > nav > div > div:nth-child(2) > a").click();

    cy.get("input[name=email]").type(email);

    cy.get("input[name=password]").type(`${password}{enter}`);

    cy.url().should("include", "/dashboard");

    cy.contains("Admin Link").should("not.exist");
  });
});
