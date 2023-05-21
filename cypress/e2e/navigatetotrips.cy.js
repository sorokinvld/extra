describe("Navigation", () => {
  it("should navigate to the trips page", () => {
    // Start from the index page
    cy.visit("http://localhost:3001/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('nav > ul > li > a[href*="trips"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/trips");

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("Our trips");
  });
});
