describe("Navigation", () => {
  it("should navigate to the contact page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('nav > ul > li > a[href*="contact"]').click();

    // The new url should include "/about"
    cy.url().should("include", "/contact");

    // The new page should contain an h1 with "About page"
    cy.get("h1").contains("Get in touch");
  });
});
