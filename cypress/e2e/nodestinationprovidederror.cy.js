describe("No destination error handling", () => {
  it("should provide an error message", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // The new url should include "/about"
    cy.url().should("include", "/");

    // Presses the search button
    cy.wait(1000);
    cy.get("[data-e2e=searchbar-button]").click({ force: true });

    // Error message should be displayed
    cy.get(
      ".Toastify > .Toastify__toast-container > .Toastify__toast > .Toastify__toast-body > div"
    ).contains("Please provide a destination!");
  });
});
