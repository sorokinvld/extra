describe("Navigation", () => {
  it("should navigate to the home page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // The new url should include "/"
    cy.wait(1000);
    cy.url().should("include", "/");

    // The new page should contain an h1 with "Not sure where to go ? Perfect."
    cy.get("h1").contains("Not sure where to go ? Perfect.");
  });
});
