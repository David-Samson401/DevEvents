/// <reference types="cypress" />

describe("Events Page", () => {
  beforeEach(() => {
    cy.visit("/events");
  });

  it("should load the events page successfully", () => {
    cy.get("h1").should("contain", "All Events");
    cy.get("p").should("contain", "Discover developer events");
  });

  it("should display Create Event button", () => {
    cy.get('a[href="/events/create"]').should("be.visible");
  });

  it("should display events grid or empty state", () => {
    // Either shows events list or empty state message
    cy.get("body").then(($body) => {
      if ($body.find(".events li").length > 0) {
        // Events exist
        cy.get(".events").should("be.visible");
        cy.get(".events li").should("have.length.at.least", 1);
      } else {
        // Empty state
        cy.contains("No events found").should("be.visible");
      }
    });
  });

  it("should have clickable event cards that navigate to event details", () => {
    cy.get("body").then(($body) => {
      if ($body.find(".events li a").length > 0) {
        cy.get(".events li a").first().click();
        cy.url().should("include", "/events/");
      }
    });
  });
});
