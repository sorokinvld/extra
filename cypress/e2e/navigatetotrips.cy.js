describe("Navigation", () => {
  it("should navigate to the trips page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "trips" and click it
    cy.get('nav > ul > li > a[href*="trips"]').click();

    // The new url should include "/trips"
    cy.url().should("include", "/trips");

    // The new page should contain an h1 with "Our trips"
    cy.get("h1").contains("Our trips");
  });
});
