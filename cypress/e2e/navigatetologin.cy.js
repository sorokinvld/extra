describe("Navigation", () => {
  it("should navigate to the login page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "login" and click it
    cy.get("[data-e2e=login-button]").click();

    // The new url should include "/login"
    cy.wait(1000);
    cy.url().should("include", "/login");

    // The new page should contain an h1 with "Welcome to Extra Virgin Travel"
    cy.get("h1").contains("Welcome to Extra Virgin Travel");
  });
});
