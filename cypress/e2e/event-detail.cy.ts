/// <reference types="cypress" />

describe("Event Detail Page", () => {
  it("should show 404 for non-existent event", () => {
    cy.visit("/events/non-existent-event-slug-12345", {
      failOnStatusCode: false,
    });
    cy.get("body").should(($body) => {
      const text = $body.text().toLowerCase();
      expect(text.includes("404") || text.includes("not found")).to.be.true;
    });
  });

  it("should display event details when event exists", () => {
    // First go to events page to find an event
    cy.visit("/events");

    cy.get("body").then(($body) => {
      if ($body.find(".events li a").length > 0) {
        // Click on first event
        cy.get(".events li a").first().click();

        // Should be on event detail page
        cy.url().should("match", /\/events\/.+/);

        // Check for event detail sections
        cy.get("#event").should("exist");
        cy.get("h1").should("be.visible");
      } else {
        // No events available, skip this test
        cy.log("No events available to test event detail page");
      }
    });
  });

  it("should display booking form on event detail page", () => {
    cy.visit("/events");

    cy.get("body").then(($body) => {
      if ($body.find(".events li a").length > 0) {
        cy.get(".events li a").first().click();

        // Check for booking section
        cy.get("#book-event").should("exist");
        cy.get('input[type="email"]').should("be.visible");
        cy.get('button[type="submit"]').should("be.visible");
      }
    });
  });
});
