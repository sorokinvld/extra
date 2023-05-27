describe("Navigation", () => {
  it("should navigate to the tours page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "tours" and click it
    cy.get('nav > ul > li > a[href*="tours"]').click();

    // The new url should include "/tours"
    cy.url().should("include", "/tours");

    // The new page should contain an h1 with "Our tours"
    cy.get("h1").contains("Our tours");
  });
});
